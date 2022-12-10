import express, { json } from 'express';
import cors from 'cors';
import categoriesRouter from "./routes/categories.route.js"
import customersRouter from "./routes/customers.route.js"
import gamesRouter from "./routes/games.route.js"

const app = express();
app.use(cors());
app.use(json())

app.use(categoriesRouter)
app.use(customersRouter)
app.use(gamesRouter)

app.listen(4000, () => console.log("Projeto rodando na porta 4000."))