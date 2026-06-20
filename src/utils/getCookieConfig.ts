import { env } from "process"


export const cookieConfig = {
    maxAge: Number(env.REFRESH_TOKEN_TIME),
    httpOnly: true,
    secure: false,
    sameSite: "none"
};