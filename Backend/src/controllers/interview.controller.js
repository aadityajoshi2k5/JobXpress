import {PDFParse} from "pdf-parse"
import { generateInterviewReport } from "../services/ai.services.js";
import interviewReportModel from "../models/interviewReport.model.js";

export async function generateInterviewReportController(req, res) {

    const resumeContent = await (new PDFParse(Uint8Array.from(req.file.buffer))).getText(); //reads the raw bytes
    const { selfDescription, jobDescription } = req.body;

    const interviewReportByAi = await generateInterviewReport({
        resume: resumeContent.text,
        selfDescription,
        jobDescription,
    })

    const interviewReport = await interviewReportModel.create({
        user: req.user.id,
        resume: resumeContent.text,
        selfDescription, 
        jobDescription,
        ...interviewReportByAi
    })

    res.status(201).json({
        message: "interview report generated successfully",
        interviewReport
    })

}