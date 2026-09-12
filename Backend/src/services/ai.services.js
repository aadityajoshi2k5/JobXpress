import { GoogleGenAI } from "@google/genai";
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";
import "dotenv/config"

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY
})

const interviewReportSchema = {
    type: "object",
    properties: {
        matchScore: {
            type: "number"
        },

        technicalQuestion: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    question: {
                        type: "string"
                    },
                    intention: {
                        type: "string"
                    },
                    answer: {
                        type: "string"
                    }
                },
                required: ["question", "intention", "answer"]
            }
        },

        behavioralQuestion: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    question: {
                        type: "string"
                    },
                    intention: {
                        type: "string"
                    },
                    answer: {
                        type: "string"
                    }
                },
                required: ["question", "intention", "answer"]
            }
        },

        skillGap:{
            type: "array",
            items: {
                type: "object",
                properties: {
                    skill: {
                        type: "string"
                    },
                    severity: {
                        type: "string",
                        enum: ["low", "medium", "high"]
                    }
                },
                required: ["skill", "severity"]
            }
        },

        preparationPlan: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    day: {
                        type: "number"
                    },
                    focus: {
                        type: "string"
                    },
                    tasks: {
                        type: "array",
                        items: {
                            type: "string"
                        }
                    }
                },
                required: ["day", "focus", "tasks"]
            }
        },

        title: {
            type: "string"
        }
    },

    required: [
        "matchScore",
        "technicalQuestion",
        "behavioralQuestion",
        "skillGap",
        "preparationPlan",
        "title"
    ]
};


export async function generateInterviewReport({ resume, selfDescription, jobDescription }) {

    const prompt = `
Generate an interview report for a candidate with the following details:

Resume:
${resume}

Self Description:
${selfDescription}

Job Description:
${jobDescription}

### IMPORTANT OUTPUT INSTRUCTIONS:

Generate ONLY a valid JSON object.

The JSON MUST follow the provided schema EXACTLY.

Do NOT:
- add any extra fields
- remove any required fields
- rename any fields
- use different field names
- return markdown
- return \`\`\`json
- return any explanation before or after the JSON

Use ONLY the fields defined in the schema.

The output must match the exact structure, field names, data types, and nested structure defined by the schema.

Return ONLY the JSON object.
`;

    const response = await ai.models.generateContent({
        model: "gemini-3.1-flash-lite",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: interviewReportSchema
        }
    });

    return JSON.parse(response.text )
}  
