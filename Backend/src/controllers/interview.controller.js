import {PDFParse} from "pdf-parse"
import { generateInterviewReport, generateResumePdf } from "../services/ai.services.js";
import interviewReportModel from "../models/interviewReport.model.js";

/**
 * 
 * @description Controller to generate an interview report based on the user's resume, self-description, and job description. It uses AI services to analyze the provided information and create a comprehensive interview report.
 */
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

/**
 * 
 * @description Controller to retrieve an interview report by its ID. 
 */

export async function getInterviewReportByIdController(req, res) { 
    const { interviewId } = req.params;

    const interviewReport = await interviewReportModel.findOne({ _id: interviewId, user: req.user.id });

    if (!interviewReport) {
        return res.status(404).json({
            message: "Interview report not found"
        })
    }

    res.status(200).json({
        message: "Interview report retrieved successfully",
        interviewReport
    })
}

/**
 * @description Controller to retrieve all interview reports of the logged-in user. 
 */
export async function getAllInterviewReportsController(req, res) {
    const interviewReports = await interviewReportModel.find({ user: req.user.id }).sort({createdAt: -1}).select("-resume -selfDescription -jobDescription -_v -technicalQuestion -behavioralQuestion -skillGap -preparationPlan");  

    res.status(200).json({
        message: "Interview reports retrieved successfully",
        interviewReports
    })
}

/**
 * @description Controller to generate resume PDF based on user self description, resume and job description.
 */
export async function generateResumePdfController(req, res) {
    const { interviewReportId } = req.params

    const interviewReport = await interviewReportModel.findById(interviewReportId)

    if (!interviewReport) {
        return res.status(404).json({
            message: "Interview report not found."
        })
    }

    const { resume, jobDescription, selfDescription } = interviewReport


    const pdfBuffer = await generateResumePdf({ resume, jobDescription, selfDescription })


    res.set({
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename=resume_${interviewReportId}.pdf`
    })

    res.send(pdfBuffer)
}
