import { Router } from "express";
import { handleUserGetMe, handleUserLogin, handleUserLogout, handleUserRegistration } from "../controllers/auth.controller.js";
import { authUser } from "../middlewares/auth.middleware.js";

const authRouter = Router();

/**
 * @route /api/auth/register
 * @description registers a new user
 * @access public
 */

authRouter.post("/register", handleUserRegistration)

/**
 * @route /api/auth/login
 * @description logins user
 * @access public
 */

authRouter.post("/login", handleUserLogin);

/**
 * @route /api/auth/logout
 * @description logouts user by removing cookie and adding it to blacklist
 * @access public
 */

authRouter.get("/logout", handleUserLogout)

/**
 * @route /api/auth/get-me
 * @description gets the details of the logged in user
 * @access private
 */

authRouter.get("/get-me",authUser, handleUserGetMe)

export default authRouter;  