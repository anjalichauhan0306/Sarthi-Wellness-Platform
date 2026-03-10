import express from "express";
import { generateDailyShlok, getDailyShlok } from "../controllers/soul.js";

const soulRouter = express.Router();

soulRouter.post("/today", getDailyShlok);
soulRouter.post("/generate-shlok", generateDailyShlok);

export default soulRouter;
