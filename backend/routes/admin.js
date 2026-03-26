import express from "express";
import adminProtect from "../utils/adminProtect.js";
import {
  deleteUser,
  getAllActivities,
  getAllUsers,
  getAdminStats,
  toggleAdmin,
} from "../controllers/admin.js";

const adminRoute = express.Router();

// Users
adminRoute.get("/users", adminProtect, getAllUsers);
adminRoute.delete("/users/:id", adminProtect, deleteUser);
adminRoute.patch("/users/:id/toggle-admin", adminProtect, toggleAdmin);

// Activities
adminRoute.get("/activities", adminProtect, getAllActivities);

// Stats
adminRoute.get("/stats", adminProtect, getAdminStats);

export default adminRoute;