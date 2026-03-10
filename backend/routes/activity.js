import express from "express";
import {
  getTodayActivity,
  getWeeklyActivity,
  logActivity,
} from "../controllers/activity.js";
import protect from "../middleware/Auth.js";

const activityRouter = express.Router();

activityRouter.use(protect);
activityRouter.post("/log", logActivity);
activityRouter.get("/today", getTodayActivity);
activityRouter.get("/stats", getWeeklyActivity);

export default activityRouter;
