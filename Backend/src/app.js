import express from "express";
import { configDotenv } from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors"
configDotenv();

const app = express();


app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true 
}))

// acquiring the routes
import authRouter from "./routes/auth.routes.js";
import interviewRouter from "./routes/interview.routes.js";

//using the routes
app.use("/api/auth", authRouter);
app.use("/api/interview", interviewRouter);



export default app;