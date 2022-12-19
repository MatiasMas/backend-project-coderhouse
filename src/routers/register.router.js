import express from "express";
import * as registerController from "../controllers/register.controller.js";

const registerRouter = express.Router();

registerRouter.post("/register", registerController.registerUser);

export default registerRouter;