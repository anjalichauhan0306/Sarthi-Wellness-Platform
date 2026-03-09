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
      date: today 
    });

    if (alreadyLogged) {
      return res.status(200).json({ 
        success: true, 
        message: "Already logged for today", 
        alreadyDone: true 
      });
    }

    // --- 2. CREATE LOG (Agar pehle nahi kiya hai) ---
    const newActivity = new Activity({
      userId,
      activityType,
      contentId,
      points: 10, // Fixed points
      date: today
    });

    await newActivity.save();

    // --- 3. STREAK & POINTS LOGIC ---
    const user = await User.findById(userId);
    
    // Points add karo
    user.totalPoints = (user.totalPoints || 0) + 10;
    
    // Streak logic
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split("T")[0];

    if (user.lastLoginDate === yesterdayStr) {
      user.streak += 1;
    } else if (user.lastLoginDate !== today) {
      user.streak = 1;
    }
    
    user.lastLoginDate = today;
    await user.save();

    res.status(201).json({ 
      success: true, 
      message: "Activity logged & points earned!", 
      streak: user.streak, 
      points: user.totalPoints 
    });

  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
/**
 * 2. Get Today's Activity (For Dashboard Load)
 */
export const getTodayActivity = async (req, res) => {
  try {
    const userId = req.user._id;
    const today = new Date().toISOString().split("T")[0];
    const activity = await Activity.findOne({ userId, date: today });

    if (!activity) return res.status(404).json({ logged: false, message: "No data for today" });
    
    res.status(200).json({ logged: true, activity });
  } catch (error) {
    res.status(500).json({ message: "Error fetching data" });
  }
};

/**
 * 3. Weekly Statistics (For Charts)
 */
export const getWeeklyStats = async (req, res) => {
  try {
    const userId = req.user._id;
    const endDate = new Date().toISOString().split("T")[0];
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 7);
    const startDateStr = startDate.toISOString().split("T")[0];

    const activities = await Activity.find({
      userId,
      date: { $gte: startDateStr, $lte: endDate }
    }).sort({ date: 1 });

    if (!activities.length) return res.status(404).json({ message: "No data found" });

    // Calculating Averages
    const avgMood = (activities.reduce((s, a) => s + a.mood.level, 0) / activities.length).toFixed(1);
    const avgScore = (activities.reduce((s, a) => s + a.progressScore, 0) / activities.length).toFixed(1);

    res.status(200).json({
      avgMood,
      avgProgress: avgScore,
      totalDaysLogged: activities.length,
      history: activities.map(a => ({ 
        date: a.date, 
        score: a.progressScore,
        mood: a.mood.level 
      }))
    });
  } catch (error) {
    res.status(500).json({ message: "Error calculating stats" });
  }
};

/**
 * 4. Mood Trend Analysis
 */
export const getMoodTrend = async (req, res) => {
    try {
      const userId = req.user._id;
      // Last 7 entries
      const activities = await Activity.find({ userId }).sort({ date: -1 }).limit(7);
      
      const moodData = activities.map(a => ({
        date: a.date,
        level: a.mood.level,
        emotion: a.mood.emotion
      })).reverse(); // Oldest to newest for graph
  
      res.status(200).json(moodData);
    } catch (error) {
      res.status(500).json({ message: "Trend error" });
    }
};