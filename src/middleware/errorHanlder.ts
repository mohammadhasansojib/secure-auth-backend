import { ErrorCode } from "../types/errorType.js";


export class AppError extends Error {
    public status: number;
    public code: ErrorCode;
    public error: any;

    constructor(
        message: string = "Something went wrong!",
        error: any = {},
        status: number = 500,
        code: ErrorCode = "INTERNAL_SERVER_ERROR",
    ) {
        super(message);
        this.status = status;
        this.code = code;
        this.error = error;
    }
}

export class NotFoundError extends AppError {
    constructor(
        message: string = "Not Found",
        error: any = {},
        status: number = 404,
        code: ErrorCode = "NOT_FOUND",
    ) {
        super(message, error, status, code);
    }
}

export class ForbiddenError extends AppError {
    constructor(
        message: string = "Forbidden",
        error: any = {},
        status: number = 403,
        code: ErrorCode = "FORBIDDEN",
    ) {
        super(message, error, status, code);
    }
}

export class AuthorizationError extends AppError {
    constructor(
        message: string = "Unauthorized Access",
        error: any = {},
        status: number = 401,
        code: ErrorCode = "UNAUTHORIZED",
    ) {
        super(message, error, status, code);
    }
}

export class BadRequestError extends AppError {
    constructor(
        message: string = "Bad request",
        error: any = {},
        status: number = 400,
        code: ErrorCode = "BAD_REQUEST",
    ) {
        super(message, error, status, code);
    }
}