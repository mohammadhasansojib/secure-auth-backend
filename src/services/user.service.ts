import bcrypt from "bcryptjs"
import { userRepository } from "../repositories/user.repository.js";
import { removePassword } from "../utils/passwordRemover.js";
import * as z from "zod"
import { AppError, AuthorizationError, BadRequestError, NotFoundError } from "../middleware/errorHanlder.js";
import { logger } from "../utils/logging.js";
import { formatZodError } from "../utils/formatZodError.js";
import { getAccessToken, getRefreshToken } from "../utils/get_JWT_Token.js";
import { addDays } from "date-fns";

const userRepo = new userRepository();

const createUser = async (
    username: string,
    email: string,
    password: string,
    age: number,
    role: "admin" | "user" = "user"
) => {
    // user info validation
    const User = z.object({
        username: z.string()
        .min(3, `username must be atleast 3 characters`)
        .max(30, `username cannot exceed 30 characters`)
        .trim(),

        email: z.email("Invalid email address")
        .min(1, "email is required")
        .trim(),

        password: z.string()
        .min(8, "password must be atleast 8 characters")
        .max(50, "password cannot exceed 50 characters")
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 
      "Password must contain uppercase, lowercase, and number"),

        age: z.number()
        .min(10, "age cannot be less that 10 years")
        .max(100, "age cannot exceed 100 years"),

        role: z.enum(["admin", "user"], {
            error: "Role must be either 'user' or 'admin'"
        }).optional(),
    });
    const validationResult = User.safeParse({
        username,
        email,
        password,
        age,
        role,
    });

    if (!validationResult.success) {
        logger.error("invalid user data", formatZodError(validationResult.error));
        throw new BadRequestError("invalid data", formatZodError(validationResult.error));
    }

    // generate hash password
    const passwordHash = await bcrypt.hash(password, 10);
    // convert user role to uppercase
    const upperCaseRole = role.toUpperCase() as ("ADMIN" | "USER");

    // create user into db
    const user = await userRepo.createUserIntoDB({
        ...validationResult.data,
        passwordHash,
        role: upperCaseRole,
    });

    if (user === undefined) {
        throw new AppError("user cannot be created");
    }

    return removePassword(user);
}

const validateUser = async (
    email: string,
    password: string,
    rememberMe: boolean = false,
) => {
    // 1. email validation
    const EmailSchema = z.object({
        email: z.email("Invalid email address")
        .min(1, "email is required")
        .trim()
    });
    const validEmail = EmailSchema.safeParse({
        email,
    });


    // email validation error case
    if (!validEmail.success) {
        logger.error("invalid email address", formatZodError(validEmail.error));
        throw new BadRequestError("invalid email address", formatZodError(validEmail.error));
    }
    logger.info("email validation successful for login", {email: validEmail.data.email});
    
    // 2. fetch user by email
    const user = await userRepo.getUserByEmail(validEmail.data.email);
    // user not found case
    if (user === null || !user) {
        logger.error("user not found for login", {
            email: validEmail.data.email,
        });
        throw new NotFoundError("user not found");
    }

    // 3. password matching
    const isPasswordMatched = await bcrypt.compare(password, user.passwordHash);
    // password mismatch case
    if (!isPasswordMatched) {
        logger.error("password mismatched for login", {
            email: validEmail.data.email,
        });
        throw new AuthorizationError("invalid password");
    }
    logger.info("password matched for login", {
        email: validEmail.data.email,
    });

    // 4. access token generation
    const accessToken = getAccessToken(
        user.id,
        "session_id_here",
        user.email
    );

    // return data
    if (rememberMe) {
        return {
            accessToken,
            user_id: user.id,
            refreshToken: getRefreshToken(
                user.id,
                "session_id_here",
                user.email
            ),
        }
    }
    
    return {
        accessToken,
        user_id: user.id,
    };
}

const saveRefreshToken = async (
    token: string,
    sessionId: string,
    userId: number,
) => {
    const tokenHash = await bcrypt.hash(token, 10);
    const expireDate = addDays(
        new Date(),
        7,
    );

    const userSessionInfo = await userRepo.storeRefreshTokenIntoDB({
        tokenHash,
        sessionId,
        userId,
        expiresAt: expireDate,
    });

    return userSessionInfo;
}


export default {
    createUser,
    validateUser,
    saveRefreshToken,
}