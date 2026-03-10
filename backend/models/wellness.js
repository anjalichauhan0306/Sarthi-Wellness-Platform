import mongoose from "mongoose";

const wellnessSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    date: { type: String, required: true },
    body: {
      waterIntake: String,
      breakfast: String,
      lunch: String,
      dinner: String,
      healthyChoice: String,
    },
    mind: {
      todayThought: String,
      affirmation: String,
      dailyHabit: String,
      gentleReminders: [String],
      meditationVideos: [String],
    },
  },
  { timestamps: true },
);

wellnessSchema.index({ userId: 1, date: 1 }, { unique: true });
export default mongoose.model("Wellness", wellnessSchema);
