import User from "../models/user.js";
import Activity from "../models/activity.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).select("-password").sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch users" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    if (req.user._id.toString() === id) {
      return res.status(400).json({ message: "Cannot delete your own account" });
    }
    await User.findByIdAndDelete(id);
    await Activity.deleteMany({ userId: id });
    res.json({ message: "User deleted successfully" });
  } catch {
    res.status(500).json({ message: "Delete failed" });
  }
};

export const getAllActivities = async (req, res) => {
  try {
    const activities = await Activity.find({}).sort({ createdAt: -1 });
    res.json(activities);
  } catch {
    res.status(500).json({ message: "Failed to fetch activities" });
  }
};

export const getAdminStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalActivities = await Activity.countDocuments();
    const adminCount = await User.countDocuments({ isAdmin: true });
    const today = new Date().toISOString().split("T")[0];
    const activeToday = await Activity.distinct("userId", { date: today });
    res.json({ totalUsers, totalActivities, adminCount, activeToday: activeToday.length });
  } catch {
    res.status(500).json({ message: "Failed to fetch stats" });
  }
};

export const toggleAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    if (req.user._id.toString() === id) {
      return res.status(400).json({ message: "Cannot change your own admin status" });
    }
    const user = await User.findById(id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    user.isAdmin = !user.isAdmin;
    await user.save();
    res.json({ message: `User is now ${user.isAdmin ? "an admin" : "a regular user"}`, user });
  } catch {
    res.status(500).json({ message: "Failed to toggle admin status" });
  }
};