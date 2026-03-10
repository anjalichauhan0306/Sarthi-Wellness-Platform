import Activity from "../models/activity.js";
import User from "../models/user.js";

export const logActivity = async (req, res) => {
  try {
    const userId = req.user._id;
    const { activityType, contentId } = req.body;
    const today = new Date().toISOString().split("T")[0];

    const alreadyLogged = await Activity.findOne({
      userId,
      activityType,
      contentId,
      date: today,
    });
    if (alreadyLogged) {
      return res.status(200).json({
        success: true,
        message: "Already logged for today",
        alreadyDone: true,
      });
    }

    const newActivity = new Activity({
      userId,
      activityType,
      contentId,
      points: 10,
      date: today,
    });
    await newActivity.save();

    const user = await User.findById(userId);

    user.totalPoints = (user.totalPoints || 0) + newActivity.points;

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split("T")[0];

    if (user.lastLoginDate === yesterdayStr) {
      user.streak = (user.streak || 0) + 1;
    } else if (user.lastLoginDate !== today) {
      user.streak = 1;
    }

    user.lastLoginDate = today;

    await user.save();

    res.status(201).json({
      success: true,
      streak: user.streak,
      points: user.totalPoints,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getTodayActivity = async (req, res) => {
  try {
    const userId = req.user._id;
    const today = new Date().toISOString().split("T")[0];

    const activities = await Activity.find({
      userId,
      date: today,
    });

    res.status(200).json({
      logged: activities.length > 0,
      activities,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching data",
    });
  }
};

export const getWeeklyActivity = async (req, res) => {
  try {
    const userId = req.user._id;
    const today = new Date();
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(today.getDate() - 6);

    const activities = await Activity.find({
      userId,
      date: {
        $gte: sevenDaysAgo.toISOString().split("T")[0],
        $lte: today.toISOString().split("T")[0],
      },
    });

    const pointsByDay = {};
    for (let i = 0; i < 7; i++) {
      const d = new Date();
      d.setDate(today.getDate() - i);
      const dayStr = d.toISOString().split("T")[0];
      pointsByDay[dayStr] = 0;
    }

    activities.forEach((act) => {
      pointsByDay[act.date] = (pointsByDay[act.date] || 0) + act.points;
    });

    const chartData = Object.keys(pointsByDay)
      .sort()
      .map((date) => ({ date, score: pointsByDay[date] }));

    res.status(200).json(chartData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMoodTrend = async (req, res) => {
  try {
    const userId = req.user._id;
    const activities = await Activity.find({ userId })
      .sort({ date: -1 })
      .limit(7);

    const moodData = activities
      .map((a) => ({
        date: a.date,
        level: a.mood.level,
        emotion: a.mood.emotion,
      }))
      .reverse();

    res.status(200).json(moodData);
  } catch (error) {
    res.status(500).json({ message: "Trend error" });
  }
};
