import express, { json } from 'express';
import cors from 'cors';
import categoriesRouter from "./routes/categories.route.js"
import customersRouter from "./routes/costumers.route.js"

const app = express();
app.use(cors());
app.use(json())

app.use(categoriesRouter)
app.use(customersRouter)

app.listen(4000, () => console.log("Projeto rodando na porta 4000."))