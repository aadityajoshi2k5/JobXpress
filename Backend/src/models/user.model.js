import {Schema, model} from "mongoose";

const userSchema = new Schema({
    username: {
        type: String, 
        required: [true, "this username already exists"],
        unique: true
    },
    email: {
        type: String,
        required: [true, "this email is already registered"],
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

const userModel = model("users", userSchema);

export default userModel;

