import { ErrorCode } from "../types/errorType.js";


export class AppError extends Error {
    public status: number;
    public code: ErrorCode;

    constructor(
        message: string = "Something went wrong!",
        status: number = 500,
        code: ErrorCode = "INTERNAL_SERVER_ERROR",
    ) {
        super(message);
        this.status = status;
        this.code = code;
    }
}

export class NotFoundError extends AppError {
    constructor(
        message: string = "Not Found",
        status: number = 404,
        code: ErrorCode = "NOT_FOUND",
    ) {
        super(message, status, code);
    }
}

export class ForbiddenError extends AppError {
    constructor(
        message: string = "Forbidden",
        status: number = 403,
        code: ErrorCode = "FORBIDDEN",
    ) {
        super(message, status, code);
    }
}

export class AuthorizationError extends AppError {
    constructor(
        message: string = "Unauthorized Access",
        status: number = 401,
        code: ErrorCode = "UNAUTHORIZED",
    ) {
        super(message, status, code);
    }
}

export class BadRequestError extends AppError {
    constructor(
        message: string = "Bad request",
        status: number = 400,
        code: ErrorCode = "BAD_REQUEST",
    ) {
        super(message, status, code);
    }
}