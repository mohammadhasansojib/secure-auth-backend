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


export default {
    createUser,
}