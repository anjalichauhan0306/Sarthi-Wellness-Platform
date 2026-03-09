import mongoose from "mongoose";

const soulSchema = new mongoose.Schema(
  {
    chapter: {
      type: Number,
      required: true,
    },

    verse: {
      type: Number,
      required: true,
    },

    shlok: {
      type: String,
      required: true,
    },

    meaning: {
      type: String,
      required: true,
    },

    story: {
      type: String,
      required: true,
    },

    lifeLesson: {
      type: String,
      required: true,
    },
    date : {type : String , unique: true} ,
  },
  { timestamps: true },
);

export default mongoose.model("Soul", soulSchema);
