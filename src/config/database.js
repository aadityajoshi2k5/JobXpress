import mongoose from "mongoose";

export async function connectToDB() {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("connected to db")
    } catch (error) {
        console.log(error);
    }
}

