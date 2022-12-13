import express from "express"
import { deleteRentals, getRentals, postNewRent, postReturnRent } from "../controllers/rentals.controllers.js"
import {findRent, newRent, returnRent} from "../middlewares/rentals.middlewares.js"
const router = express.Router()

router.get("/rentals", getRentals)
router.post("/rentals", newRent, postNewRent)
router.post("/rentals/:id/return", returnRent, postReturnRent)
router.delete("/rentals/:id", findRent, deleteRentals)

export default router