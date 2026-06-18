import express from "express"
import type { NextFunction, Request, Response } from "express"


const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.text());

// routes
app.get('/', (req: Request, res: Response) => {
    res.send("Server running...")
})


// global error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    const status = err.status || 500;

    res.status(status).json({
        success: false,
        message: err.message || "Something went wrong!",
        code: err.code || "INTERNAL_SERVER_ERROR",
    })
})


export default app;