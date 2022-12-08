import express from "express"
import { getCategories, postCategories } from "../controllers/categories.controllers.js"
import { validateCategories } from "../middlewares/categories.middlewares.js";
const router = express.Router()

router.get("/categories", getCategories);
router.post("/categories", validateCategories, postCategories);

export default router