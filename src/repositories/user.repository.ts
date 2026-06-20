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

    async getUserByEmail(email: string) {
        const user = await prisma.user.findUnique({
            where: {
                email,
            }
        });

        if (!user) {
            logger.info("user not found", {
                email,
            });
            throw new NotFoundError("user not found");
        }

        return user;
    }

    async storeRefreshTokenIntoDB(payload: {
        tokenHash: string,
        sessionId: string,
        userId: number,
        expiresAt: Date,
    }) {
        // store refresh token into db
        const refreshToken = await prisma.refreshToken.create({
            data: {
                tokenHash: payload.tokenHash,
                sessionId: payload.sessionId,
                userId: payload.userId,
                expiresAt: payload.expiresAt,
            }
        });

        if (!refreshToken) {
            logger.error("something went wrong, can't store refresh token into db.");
            throw new AppError("can't store refresh token into db");
        }
        logger.info("stored user session info into db", {
            userId: payload.userId,
        });

        return refreshToken;
    }

}