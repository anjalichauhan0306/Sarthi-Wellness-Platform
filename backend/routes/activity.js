import express from "express";
import { 
  logActivity, 
  getTodayActivity, 
  getActivityHistory, 
  getWeeklyStats, 
  getMoodTrend 
} from "../controllers/activity.js"; 
import protect from "../middleware/Auth.js";

const router = express.Router();

router.use(protect);
router.post("/log", logActivity);
router.get("/today", getTodayActivity);
router.get("/history", getActivityHistory);
router.get("/stats", getWeeklyStats);
router.get("/mood-trend", getMoodTrend);

export default router;