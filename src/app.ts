import express from "express"
import type { Request, Response } from "express"


const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.text());

// routes
app.get('/', (req: Request, res: Response) => {
    res.send("Server running...")
})


export default app;