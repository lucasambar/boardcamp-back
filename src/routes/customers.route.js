import express  from "express";
import { getCustomers } from "../controllers/customers.controllers.js";
const router = express.Router()

router.get("/customers", getCustomers)
router.get("/customers/:id", getCustomers)

export default router