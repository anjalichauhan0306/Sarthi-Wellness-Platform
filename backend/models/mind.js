import mongoose from "mongoose";

const mindSchema = new mongoose.Schema(
  {
    date: {
      type: String, // "2026-02-14"
      required: true,
      unique: true,
    },

    todayThought: {
      type: String,
      required: true,
    },

    affirmation: {
      type: String,
      required: true,
    },

    dailyHabit: {
      type: String,
      required: true,
    },

    gentleReminders: [
      {
        type: String,
      },
    ],

    meditationVideos: [
      {
        type: String, // youtube embed links
      },
    ],
  },
  { timestamps: true },
);

export default mongoose.model("Mind", mindSchema);
