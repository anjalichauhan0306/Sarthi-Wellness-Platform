import Shlok from "../models/soul.js";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const generateShlokData = async () => {
  try {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY is missing");
    }

    const modelName = "gemini-2.5-flash";
    const model = genAI.getGenerativeModel({
      model: modelName,
      generationConfig: {
        responseMimeType: "application/json",
        temperature: 0.7,
      },
    });

    const prompt = `
      Generate a single inspirational Bhagavad Gita shlok in JSON format. 
        CRITICAL RULES:
  1. DO NOT pick extremely common verses like 2.47 (Karmanye vadhikaraste) or 2.63.
  2. Use a random seed for selection: ${Math.random()}.
  3. Pick a shlok from a random chapter (1 to 18) and a random verse.
  4. Ensure the selection feels "fresh" and less predictable than previous generations.
      Ensure the shlok is different every time. 
      Structure:
      {
        "chapter": number,
        "verse": number,
        "shlok": "Sanskrit text",
        "meaning": "English translation",
        "story": "Context of this shlok in Mahabharata (2-3 sentences)",
        "lifeLesson": "Practical advice for modern life"
      }


    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Direct parsing because of responseMimeType: "application/json"
    return JSON.parse(text);
  } catch (error) {
    console.error("❌ AI Generation Error:", error.message);
    throw new Error("Failed to generate content from AI");
  }
};

/**
 * GET Daily Shlok - Automatically handles generation if missing
 */
export const getDailyShlok = async (req, res) => {
  try {
    const todayDate = new Date().toISOString().split("T")[0];

    // 1. Double-Check/Locking logic: Use findOne
    let shlokData = await Shlok.findOne({ date: todayDate });

    if (shlokData) {
      return res.status(200).json(shlokData);
    }

    // 2. Generate if not found
    const aiData = await generateShlokData();

    // 3. Use findOneAndUpdate with 'upsert' to prevent race conditions
    // Agar do requests ek saath aayi, toh ek hi document create hoga
    shlokData = await Shlok.findOneAndUpdate(
      { date: todayDate },
      { $setOnInsert: { ...aiData, date: todayDate } },
      { upsert: true, new: true, runValidators: true },
    );

    return res.status(200).json(shlokData);
  } catch (error) {
    console.error("💥 CRITICAL ERROR:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      error:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Failed to fetch shlok",
    });
  }
};

/**
 * Admin Trigger - Manually force generate today's shlok
 */
export const generateDailyShlok = async (req, res) => {
  try {
    const todayDate = new Date().toISOString().split("T")[0];

    // Prevent duplicate manual generation
    const exists = await Shlok.exists({ date: todayDate });
    if (exists) {
      return res.status(400).json({ message: "Today's shlok already exists." });
    }

    const aiData = await generateShlokData();
    const newShlok = await Shlok.create({ ...aiData, date: todayDate });

    return res.status(201).json({
      message: "Shlok generated successfully",
      data: newShlok,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Manual generation failed", error: error.message });
  }
};
