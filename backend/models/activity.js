import mongoose from "mongoose";

// // const activitySchema = new mongoose.Schema(
// //   {
// //     userId: {
// //       type: mongoose.Schema.Types.ObjectId,
// //       ref: "User",
// //       required: true,
// //     },
    
// //     date: {
// //       type: String,
// //       required: true, // Format: YYYY-MM-DD
// //     },
    
// //     // Mood Tracking
// //     mood: {
// //       level: {
// //         type: Number,
// //         min: 1,
// //         max: 10,
// //         required: true,
// //       },
// //       emotion: {
// //         type: String,
// //         enum: ["happy", "sad", "anxious", "calm", "angry", "grateful", "overwhelmed", "peaceful"],
// //         required: true,
// //       },
// //       reason: String, // Why they feel this way
// //     },
    
// //     // Physical Activities
// //     activities: {
// //       meditation: {
// //         duration: Number, // in minutes
// //         completed: Boolean,
// //       },
// //       yoga: {
// //         duration: Number,
// //         completed: Boolean,
// //       },
// //       exercise: {
// //         type: String,
// //         duration: Number,
// //         completed: Boolean,
// //       },
// //     },
    
// //     // Wellness Metrics
// //     waterIntakeL: Number, // Liters
// //     sleepHours: Number,
// //     screenTimeHours: Number,
    
// //     notes: String,
    
// //     progressScore: {
// //       type: Number,
// //       min: 0,
// //       max: 100,
// //       default: 0,
// //     },
// //   },
// //   { timestamps: true }
// // );

// // activitySchema.index({ userId: 1, date: 1 }, { unique: true });

// // export default mongoose.model("Activity", activitySchema);


// import mongoose from "mongoose";

// const activitySchema = new mongoose.Schema({
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//   date: { type: String, required: true }, // YYYY-MM-DD
  
//   mood: {
//     level: { type: Number, min: 1, max: 10, required: true },
//     emotion: { type: String, required: true } // e.g., "Happy", "Stressed"
//   },

//   // Wellness Plan tracking
//   activities: {
//     breakfast: { completed: { type: Boolean, default: false } },
//     lunch: { completed: { type: Boolean, default: false } },
//     dinner: { completed: { type: Boolean, default: false } },
//     meditation: { completed: { type: Boolean, default: false } },
//     dailyHabit: { completed: { type: Boolean, default: false } }
//   },

//   waterIntakeL: { type: Number, default: 0 },
//   sleepHours: { type: Number, default: 0 },
//   screenTimeHours: { type: Number, default: 0 },
//   progressScore: { type: Number, default: 0 },

// }, { timestamps: true });

// activitySchema.index({ userId: 1, date: 1 }, { unique: true });


const activitySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  activityType: { type: String, enum: ['shlok', 'meditation', 'body'], required: true },
  contentId: { type: String }, 
  points: { type: Number, default: 10 },
  date: { type: String, required: true }, // "2024-05-20"
  timestamp: { type: Date, default: Date.now }
});


export default mongoose.model("Activity", activitySchema);