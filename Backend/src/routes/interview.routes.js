import { Router } from "express";
import { authUser } from "../middlewares/auth.middleware.js";
import upload from "../middlewares/file.middleware.js";
import { generateInterviewReportController } from "../controllers/interview.controller.js";

const interviewRouter = Router();

/**
 * @route POST /api/interview/
 * @description generates an interview report on the basis of user's self desciption, resume and job description
 * @access private
 */

interviewRouter.post("/", authUser, upload.single("resume"), generateInterviewReportController)

export default interviewRouter;