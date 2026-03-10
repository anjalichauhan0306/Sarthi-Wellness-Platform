import bcrypt from "bcrypt";
import User from "../models/user.js";
import setTokenCookie from "../utils/token.js";
import Activity from "../models/activity.js";
import wellness from "../models/wellness.js";

export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "User already exists" });

    const hashed = await bcrypt.hash(password, 10);

    await User.create({
      username,
      email,
      password: hashed,
    });

    res.status(201).json({
      message: "Registration successful. Please login.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Register failed" });
  }
};
///==== login ========//////
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Invalid credentials" });

    setTokenCookie(res, user._id);

    res.json({
      message: "login successfully",
      _id: user._id,
      username: user.username,
      email: user.email,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Login failed" });
  }
};
///===========logout ======//////////
export const logoutUser = (req, res) => {
  res.cookie("token", "", { maxAge: 0 });
  res.json({ message: "Logged out" });
};

/* ================= GET PROFILE ================= */
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to load profile" });
  }
};

/* ================= UPDATE PROFILE (ONBOARDING FORM) ================= */
export const updateProfile = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      {
        ...req.body,
        isProfileComplete: true,
      },
      { returnDocument: "after" },
    ).select("-password");

    res.json(updatedUser);
  } catch {
    res.status(500).json({ message: "Profile update failed" });
  }
};
////======auth============
export const checkauth = (req, res) => {
  res.send(!!req.user);
};



export const getDashboard = async(req,res)=>{

const userId = req.user._id;

const today = new Date().toISOString().split("T")[0];

const activity = await Activity.findOne({userId,date:today});

const wellness = await wellness.findOne({userId,date:today});

res.json({

date:today,

progressScore:activity?.progressScore || 0,

activity,

wellness

});

};