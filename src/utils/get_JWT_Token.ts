import jwt from "jsonwebtoken"
import { env } from "process"

export const getAccessToken = (
    userId: number,
    sessionId: string,
    email: string,
) => {
    return jwt.sign(
        {
            userId,
            sessionId,
            email,
        },
        env.JWT_SECRET as string,
        {
            expiresIn: Number(env.ACCESS_TOKEN_TIME),
        }
    )
}

export const getRefreshToken = (
    userId: number,
    sessionId: string,
    email: string,
) => {
    return jwt.sign(
        {
            userId,
            sessionId,
            email,
        },
        env.JWT_SECRET as string,
        {
            expiresIn: Number(env.REFRESH_TOKEN_TIME),
        }
    )
}