import userModel from "../models/user.model.js"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import blackListTokenModel from "../models/blacklist.model.js";

/**
 * @name handleUserRegistration
 * @desciption registers new user, expects mail username and pw
 * @access public
 */

export async function handleUserRegistration(req, res) {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({
            message: "empty fields detected, opinion rejected!"
        })
    }

    const ifUserExists = await userModel.findOne({
        $or: [{email}, {username}]
    })

    if (ifUserExists) {
        return res.status(400).json({
            message: "user alr exists"
        })
    }

    const hash = await bcrypt.hash(password, 10);

    const user = await userModel.create({
        username,
        email,
        password: hash
    })

    const token = jwt.sign(
        { id: user._id, email: user.email }, process.env.JWT_SECRET,
        {expiresIn: "1d"}
    )

    res.cookie("token", token);

    return res.status(201).json({
        message: "user successfully created",
        user: {
            id: user._id,
            username: user.username,
            email: user.email

        }
    })


}

/**
 * @name handleUserLogin
 * @desciption logins user, expects mail and pw
 * @access public
 */

export async function handleUserLogin(req, res) {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({
            message: "fill it correctly"
        })
    }
    const user = await userModel.findOne({ email });
    if (!user) {
        return res.status(400).json({
            message: "wrong mail or pw"
        })
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(400).json({
            message: "wrong mail or pw"
        })
    }
    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1d" })
    
    res.cookie("token", token);

    return res.status(200).json({
        message: "user logged in",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })

}

/**
 * @name handleUserLogout
 * @desciption logouts user, removes cookie and adds the token in blacklist
 * @access public
 */

export async function handleUserLogout(req, res) {
    const token = req.cookies.token;
    if (token) {
        await blackListTokenModel.create({token});
    }
    res.clearCookie("token");
    res.status(200).json({
        message: "logout successful"
    })
}

/**
 * @name handleUserGetMe
 * @desciption get the current logged in user details
 * @access private
 */
export async function handleUserGetMe(req, res) {
    console.log("hey")
    const user = await userModel.findById(req.user.id);
    
    res.status(200).json({
        message: "user details fetched successfully",
        user: {
            id: user._id,
            email: user.email,
            username: user.username
        }
    })
}