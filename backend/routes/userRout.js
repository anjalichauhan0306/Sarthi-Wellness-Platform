import express from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
  getProfile,
  checkauth,
  updateProfile,
} from "../controllers/User.js";
import protect from "../middleware/Auth.js";
const userrouter = express.Router();

userrouter.post("/register", registerUser);
userrouter.post("/login", loginUser);
userrouter.post("/logout", logoutUser);
userrouter.get("/profile", protect, getProfile);
userrouter.get("/checkauth", checkauth);
userrouter.post("/updateprofile",protect,updateProfile)
export default userrouter;
