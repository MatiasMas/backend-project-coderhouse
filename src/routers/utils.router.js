import express from "express";
import * as utilsController from "../controllers/utils.controller.js";

const utilsRouter = express.Router();

utilsRouter.get("/info", utilsController.getSystemInfo);
utilsRouter.get("/randoms", utilsController.getRandomNumbers);

export default utilsRouter;