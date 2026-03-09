import mongoose from "mongoose";

const bodySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  weight: Number,
  bmi: Number,
  fatPercentage: Number,
  date: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model("Body", bodySchema);