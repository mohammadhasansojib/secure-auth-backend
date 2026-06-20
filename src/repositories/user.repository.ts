import { Prisma } from "../generated/prisma/index.js";
import { prisma } from "../lib/prisma.js";
import { AppError, BadRequestError, NotFoundError } from "../middleware/errorHanlder.js";
import { UserPayload } from "../types/userType.js";
import { logger } from "../utils/logging.js";
import { removePassword } from "../utils/passwordRemover.js";

export class userRepository {

    async createUserIntoDB(payload: UserPayload) {
        try {

            // create user into db
            const user = await prisma.user.create({
                data: {
                    username: payload.username,
                    email: payload.email,
                    passwordHash: payload.passwordHash,
                    age: payload.age,
                    role: payload.role,
                }
            })

            // throw error if any occur
            if (!user) {
                logger.error("something went wrong: user can't created.");
                throw new AppError("something went wrong: user can't created.");
            }

            // log user creation info
            logger.info("user created", {
                username: payload.username,
                email: payload.email,
                role: payload.role
            })

            return user;

        } catch (error) {

            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                const prismaError = error as Prisma.PrismaClientKnownRequestError;

                if (prismaError.code === "P2002") {
                    throw new BadRequestError("email already exists", {
                        relation: "User",
                        field: "email",
                    })
                }
            } else {
                throw error;
            }

        }
    }

}