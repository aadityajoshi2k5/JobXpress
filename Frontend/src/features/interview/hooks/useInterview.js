import { generateInterviewReport, getInterviewReportById, getAllInterviewReports } from "../services/interview.api.js";
import { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom"
import { InterviewContext } from "../interview.context.jsx";
import { generateResumePdf } from "../services/interview.api.js";

export const useInterview = () => {
    const context = useContext(InterviewContext);
    const { interviewId } = useParams();

    if (!context) {
        throw new Error("useInterview must be used within an InterviewProvider");
    }
    const { report, setReport, reports, setReports, loading, setLoading } = context;

    const generateReport = async ({ jobDescription, selfDescription, resumeFile }) => {
        setLoading(true);
        let response = null;
        try {
            response = await generateInterviewReport({ jobDescription, selfDescription, resumeFile });
            setReport(response.interviewReport);
        }
        catch (error) {
            console.error("Error generating interview report:", error);
        }
        finally {
            setLoading(false);
        }
        return response ? response.interviewReport : null;

    }

    const getReportById = async (interviewId) => {
        setLoading(true);
        let response = null;

        try {
            response = await getInterviewReportById(interviewId);
            setReport(response.interviewReport);
        }
        catch (error) {
            console.error("Error fetching interview report by ID:", error);
        }
        finally {
            setLoading(false);
        }
        return response ? response.interviewReport : null;
    }

    const getReports = async () => {
        setLoading(true);
        let response = null;

        try {
            response = await getAllInterviewReports();
            setReports(response.interviewReports);
        }
        catch (error) {
            console.error("Error fetching all interview reports:", error);
        }
        finally {
            setLoading(false);
        }
        return response ? response.interviewReports : [];
    }

    const getResumePdf = async (interviewReportId) => {
        setLoading(true)
        let response = null
        try {
            response = await generateResumePdf({ interviewReportId })
            const url = window.URL.createObjectURL(new Blob([response], { type: "application/pdf" }))
            const link = document.createElement("a")
            link.href = url
            link.setAttribute("download", `resume_${interviewReportId}.pdf`)
            document.body.appendChild(link)
            link.click()
        }
        catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (interviewId) {
            getReportById(interviewId);
        } else {
            getReports();
        }
    }, [interviewId]);


    return { loading, report, reports, generateReport, getReportById, getReports, getResumePdf };

}