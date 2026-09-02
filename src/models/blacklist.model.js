import { Schema, model } from "mongoose";

const blackListTokenSchema = new Schema({
    token: {
        type: String,
        required: [true, "token rqd to get deleted"]
    }
}, {
    timestamps: true
})

const blackListTokenModel = model("blackListTokens", blackListTokenSchema);

export default blackListTokenModel;