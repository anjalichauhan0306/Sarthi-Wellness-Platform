import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    /* ================= AUTH ================= */

    username: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    /* ================= BASIC PROFILE ================= */

    gender: {
      type: String,
      enum: ["male", "female", "other"],
      default: null,
    },

    age: Number,
    height: Number, // cm
    weight: Number, // kg

    targetWeight: Number,

    activityLevel: {
      type: String,
      enum: ["low", "moderate", "high"],
    },

    goal: {
      type: String,
      enum: ["weight_loss", "weight_gain", "maintain"],
    },

    foodType: {
      type: String,
      enum: ["veg", "non_veg", "vegan"],
    },
    /* ================= MIND WELLNESS ================= */
    mentalState: {
      overthinking: Boolean,
      stress: Boolean,
      anxiety: Boolean,
      lowMood: Boolean,
    },
    moodLevel: {
      type: Number,
      min: 1,
      max: 10,
    },
    /* ================= LIFESTYLE ================= */

    lifestyle: {
      screenTimeHours: Number,
      sleepHours: Number,
      exercise: {
        type: String,
        enum: ["Never","1-2 / week","3-5 / week","Daily"],
      },
      workType: {
        type: String,
        enum: ["Student","Working","Business"],
      },
    },

    /* ================= SYSTEM ================= */

    isProfileComplete: {
      type: Boolean,
      default: false,
    },
streak: { type: Number, default: 0 },
lastLoginDate: { type: String },
totalPoints : {type : String}
  },
  { timestamps: true },
);

export default mongoose.model("User", userSchema);
