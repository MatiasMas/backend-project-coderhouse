import express from "express";
import * as loginController from "../controllers/login.controller.js";

const loginRouter = express.Router();

loginRouter.get("/login", loginController.loginUser);
loginRouter.get("/logout", loginController.logoutUser);

export default loginRouter;