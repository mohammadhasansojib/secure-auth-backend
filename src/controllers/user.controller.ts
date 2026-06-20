import type { Request, Response } from "express";
import userService from "../services/user.service.js";
import crypto from "crypto"
import { cookieConfig } from "../utils/getCookieConfig.js";
import { CookieConfig } from "../types/cookieConfigType.js";
import { logger } from "../utils/logging.js";


const register = async (req: Request, res: Response) => {
    // collect data from req.body object
    const {username, email, age, password, role} = req.body;

    // create user
    const user = await userService.createUser(
        username,
        email,
        password,
        age,
        role,
    );

    // successfull response
    res.status(201).json({
        success: true,
        message: "registration successfully completed",
        data: {
            user,
        }
    });
}

const login = async (req: Request, res: Response) => {
    const {email, password, rememberMe} = req.body;

    // user validation
    const validateUser = await userService.validateUser(
        email,
        password,
        rememberMe,
    );

    if (rememberMe) {
        // session id generation
        const sessionId = crypto.randomUUID();

        // cookie setting
        res.cookie("sid", sessionId, {
            ...cookieConfig as CookieConfig,
        });
        res.cookie("uid", validateUser.user_id, {
            ...cookieConfig as CookieConfig,
        });
        res.cookie("refresh_token", validateUser.refreshToken, {
            ...cookieConfig as CookieConfig,
            signed: true,
        })

        // save refresh token
        await userService.saveRefreshToken(
            validateUser.refreshToken as string,
            sessionId,
            validateUser.user_id,
        );
    }
    

    logger.info("user login successful", {
        userId: validateUser.user_id,
    })
    // response
    res.json({
        success: true,
        message: "login successful",
        data: {
            accessToken: validateUser.accessToken,
        },
    })
}

const refresh = async (req: Request, res: Response) => {

}

const getMe = async (req: Request, res: Response) => {

}

const updateMe = async (req: Request, res: Response) => {

}

const logout = async (req: Request, res: Response) => {

}

const forgetPassword = async (req: Request, res: Response) => {

}

const resetPassword = async (req: Request, res: Response) => {

}


export default {
    register,
    login,
    refresh,
    getMe,
    updateMe,
    logout,
    forgetPassword,
    resetPassword,
}