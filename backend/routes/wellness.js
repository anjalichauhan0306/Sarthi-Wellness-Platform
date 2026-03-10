import express from "express";
import {
  generateDailyWellness,
  getWellnessData,
} from "../controllers/wellness.js";
import protect from "../middleware/Auth.js";
const wellnessRouter = express.Router();

wellnessRouter.post("/generate-wellness", protect, generateDailyWellness);
wellnessRouter.get("/get-wellness", protect, getWellnessData);

export default wellnessRouter;
