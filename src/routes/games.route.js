import express from "express";
import { postGame } from "../controllers/games.controllers.js";
import { gameValidation } from "../middlewares/games.middlewares.js";
const router = express.Router()

router.post("/games", gameValidation, postGame)

export default router