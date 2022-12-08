import express from 'express';
import cors from 'cors';
import categoriesRouter from "./routes/categories.route.js"

const app = express();
app.use(cors());

app.use(categoriesRouter)

app.listen(4000, () => console.log("Projeto rodando na porta 4000."))