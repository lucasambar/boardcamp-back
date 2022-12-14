import express  from "express";
import { getCustomers, postCustomer, putCustomer } from "../controllers/customers.controllers.js";
import { customersValidation } from "../middlewares/customers.middlewares.js";
const router = express.Router()

router.get("/customers", getCustomers)
router.get("/customers/:id", getCustomers)
router.post("/customers", customersValidation, postCustomer)
router.put("/customers/:id", customersValidation, putCustomer)

export default router