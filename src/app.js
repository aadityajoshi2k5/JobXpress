import express from "express";
import { configDotenv } from "dotenv";
import cookieParser from "cookie-parser";

configDotenv();

const app = express();


app.use(express.json());
app.use(cookieParser());

// acquiring the routes
import authRouter from "./routes/auth.routes.js";

//using the routes
app.use("/api/auth", authRouter);




export default app;