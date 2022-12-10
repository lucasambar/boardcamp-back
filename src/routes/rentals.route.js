import express from "express"
import { postNewRent } from "../controllers/rentals.controllers.js"
import newRent from "../middlewares/rentals.middlewares.js"
const router = express.Router()

router.post("/rentals", newRent, postNewRent)

export default router