import express from "express"
import { getRentals, postNewRent, postReturnRent } from "../controllers/rentals.controllers.js"
import {newRent, returnRent} from "../middlewares/rentals.middlewares.js"
const router = express.Router()

router.get("/rentals", getRentals)
router.post("/rentals", newRent, postNewRent)
router.post("/rentals/:id/return", returnRent, postReturnRent)

export default router