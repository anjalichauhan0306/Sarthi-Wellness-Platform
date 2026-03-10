import express  from "express";
import dotenv from "dotenv";
import connectDB from "./utils/connection.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import soulRouter from "./routes/soul.js";
import wellnessRouter from "./routes/wellness.js";
import activityRouter from "./routes/activity.js";
import userrouter from "./routes/user.js";
dotenv.config();
connectDB();
const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin : "http://localhost:5173",
    credentials : true
}));
app.use("/api/soul",soulRouter)
app.use("/api/user",userrouter)
app.use("/api/wellness", wellnessRouter)
app.use("/api/activity",activityRouter )

app.listen(5000, () => console.log("Server running on port 5000"));

