import express from "express";
import { getGames, postGame } from "../controllers/games.controllers.js";
import { gameValidation } from "../middlewares/games.middlewares.js";
const router = express.Router()

router.post("/games", gameValidation, postGame)
router.get("/games", getGames)

export default router