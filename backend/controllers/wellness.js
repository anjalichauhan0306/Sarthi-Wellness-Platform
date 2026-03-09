import wellnessContent from "../models/wellnessContent.js";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv"; 

dotenv.config();

// 1. Correct Initialization
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const generateDailyWellness = async (req, res) => {
  try {
    const userId = req.user._id;
    const userName = req.user?.username || "User";
    const today = new Date().toISOString().split("T")[0];
    const { name, weight, height, goal, targetWeight , } = req.user;
    const exist = await wellnessContent.findOne({ userId, date: today });
    if (exist) return res.status(400).json({ message: "Plan already exists.", wellness: exist });

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      generationConfig: { responseMimeType: "application/json" } 
    });

    const prompt = `
      You are an expert Health & Wellness AI. Generate a personalized daily plan for a user with these details:
      - Name: ${name}
      - Current Weight: ${weight}kg, Height: ${height}cm
      - Goal: ${goal} (Target: ${targetWeight}kg)

      also ensure for mind data to user mind wellness {}
      Based on these details, create a balanced plan. If the goal is weight_loss, suggest high-protein, low-calorie meals. If weight_gain, suggest calorie-dense healthy meals.

      Return ONLY a JSON object matching this structure exactly:
      {
        "body": {
          "waterIntake": "string (e.g. 3.5 Liters)",
          "breakfast": "string (specific meal name)",
          "lunch": "string (specific meal name)",
          "dinner": "string (specific meal name)",
          "healthyChoice": "string (one snack or habit for the day)"
        },
        "mind": {
          "todayThought": "string (deep motivational thought)",
          "affirmation": "string (positive 'I am' statement)", 
          "dailyHabit": "string (one small mental health habit)",
          "gentleReminders": ["string", "string"],
          "meditationVideos": ["Topic 1", "Topic 2"]
        }
      }
    `;

    const result = await model.generateContent(prompt);
    const text = result.response.text();
    const cleanedText = text.replace(/```json|```/g, "").trim();
    const parsedData = JSON.parse(cleanedText);

    const newWellness = await wellnessContent.create({
      userId,
      date: today,
      body: parsedData.body,
      mind: parsedData.mind
    });

    res.status(201).json({ message: "Success", wellness: newWellness });

  } catch (error) {
    console.error("Wellness Error:", error);
    res.status(500).json({ message: "AI Generation Failed", error: error.message });
  }
};

export const getWellnessData = async (req, res) => {
  try {
    const userId = req.user._id;
    const { date } = req.query; 
    
    const targetDate = date || new Date().toISOString().split("T")[0];

    const wellness = await wellnessContent.findOne({ userId, date: targetDate });

    if (!wellness) {
      return res.status(404).json({ 
        message: "No wellness data found for this date",
        shouldGenerate: true 
      });
    }

    res.status(200).json({ wellness });
  } catch (error) {
    console.error("Error in getWellnessData:", error);
    res.status(500).json({ 
      message: "Internal Server Error", 
      error: error.message 
    });
  }
};
