import jwt from "jsonwebtoken";
import blackListTokenModel from "../models/blacklist.model.js";

export async function authUser(req, res, next) {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json(
            {
                message: "no user found/ token not provided"
            }
        )
    }

    const isBlacklistToken = await blackListTokenModel.findOne({ token });

    if (isBlacklistToken) {
        return res.status(401).json({
            message:"token is invalid"
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({
            message: "invalid token"
        })
    }


}