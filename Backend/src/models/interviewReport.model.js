import { Schema, model } from "mongoose";


/**
 * - job desciption :String
 * - resume text :String
 * - self desciption :String
 * 
 * 
 * - matchScore: Number
 * - technical qns: 
 *       [{
 *          question: "",
 *          intention: "",
 *          answer:""
 *        }]
 * - behavioral qns: 
 *        [{
 *          question: "",
 *          intention: "",
 *          answer:""
 *        }]
 * - skills gaps: [{
 *                  skill: "",
 *                  severity:{
 *                      type: String,
 *                      enum: ["low","medium","high"]
 *                  }
 *                 }]
 * - prep plan: [{
 *              day: Number, 
 *              focus: String,
 *              tasks: [String]
 *              }]
 */

const technicalQuestionSchema = new Schema({
    question: {
        type: String, 
        required: [true, "technical question is required"]
    },
    intention: {
        type: String,
        required: [true, "intention is required"]
    },
    answer: {
        type: String,
        required: [true, "answer is required"]
    }
}, {
    _id: false
})

const behavioralQuestionSchema = new Schema({
    question: {
        type: String,
        required: [true, "behavioral question is required"]
    },
    intention: {
        type: String,
        required: [true, "intention is required"]
    },
    answer: {
        type: String,
        required: [true, "answer is required"]
    }
}, {
    _id: false
})

const skillGapSchema = new Schema({
    skill: {
        type: String, 
        required: [true, "skill is required"],
    },
    severity: {
        type: String,
        enum: ["low","medium","high"],
        required: [true, "severity is required"],
    }
}, {
    _id: false
})

const preparationPlanSchema = new Schema({
    day: {
        type: Number,
        required: [true,"day is required"]
    },
    focus: {
        type: String,
        required: [true, "focus is required"]
    },
    tasks: [{
        type: String,
        required: [true, "task is required"]
    }]
    //see that tasks in within [] which signified its an array of that sthii
})

const interviewReportSchema = new Schema({
    jobDescription:{
        type: String,
        required: [true, "JD is required"]
    },
    resume: {
        type: String
    },
    selfDescription: {
        type: String
    },
    matchScore: {
        type: Number, 
        min: 0,
        max: 100
    },
    technicalQuestion: [technicalQuestionSchema],
    behavioralQuestion: [behavioralQuestionSchema],
    skillGap: [skillGapSchema],
    preparationPlan: [preparationPlanSchema],
    user: {
        type: Schema.Types.ObjectId,
        ref: "users"
    }

}, {
    timestamps: true
})

const interviewReportModel = model("InterviewReports", interviewReportSchema);

export default interviewReportModel;