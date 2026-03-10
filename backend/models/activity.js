import mongoose from "mongoose";

const activitySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  activityType: {
    type: String,
    enum: ["soul", "meditation", "body", "mind"],
    required: true,
  },
  contentId: { type: String },
  points: { type: Number, default: 10 },
  date: { type: Date, default: Date.now },
  timestamp: { type: Date, default: Date.now },
});

export default mongoose.model("Activity", activitySchema);
