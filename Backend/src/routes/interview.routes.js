import { Router } from "express";
import { authUser } from "../middlewares/auth.middleware.js";
import upload from "../middlewares/file.middleware.js";
import { generateInterviewReportController, generateResumePdfController, getAllInterviewReportsController, getInterviewReportByIdController } from "../controllers/interview.controller.js";

const interviewRouter = Router();

/**
 * @route POST /api/interview/
 * @description generates an interview report on the basis of user's self desciption, resume and job description
 * @access private
 */

interviewRouter.post("/", authUser, upload.single("resume"), generateInterviewReportController)

/**
 * @route GET /api/interview/:interviewId
 * @description retrieves an interview report by its ID
 * @access private
 */

interviewRouter.get("/:interviewId", authUser, getInterviewReportByIdController)

/**
 * @route GET /api/interview/   
 * @description retrieves all interview reports of the logged in user
 * @access private
 */

interviewRouter.get("/", authUser, getAllInterviewReportsController)

/**
 * @route GET /api/interview/resume/pdf
 * @description generate resume pdf on the basis of user self description, resume content and job description.
 * @access private
 */
interviewRouter.post("/resume/pdf/:interviewReportId",authUser, generateResumePdfController)


export default interviewRouter;