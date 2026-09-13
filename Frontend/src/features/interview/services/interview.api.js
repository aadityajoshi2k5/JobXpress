import axios from "axios"

const api = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true
})

/**
 * 
 *@description Generates an interview report based on the user's resume, self-description, and job description. It sends a POST request to the backend API with the provided data and returns the generated interview report.
 */

export const generateInterviewReport = async ({ resumeFile, selfDescription, jobDescription }) => {
    const formData = new FormData();
    formData.append("resume", resumeFile);
    formData.append("selfDescription", selfDescription);
    formData.append("jobDescription", jobDescription); 
    
    //frontend is sending the file to backend as form data, so we need to set the content type to multipart/form-data

    const response = await api.post("/api/interview", formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })


    return response.data;

}

/**
 * 
 *  @description Retrieves an interview report by its ID.
 */

export const getInterviewReportById = async (interviewId) => {
    const response = await api.get(`/api/interview/${interviewId}`);
    return response.data;
}

/**
 * 
 * @description Retrieves all interview reports of the logged-in user.
 */

export const getAllInterviewReports = async () => {
    const response = await api.get("/api/interview");
    return response.data;
}

/**
 * @description Service to generate resume pdf based on user self description, resume content and job description.
 */
export const generateResumePdf = async ({ interviewReportId }) => {
    const response = await api.post(`/api/interview/resume/pdf/${interviewReportId}`, null, {
        responseType: "blob"
    })

    return response.data
}

