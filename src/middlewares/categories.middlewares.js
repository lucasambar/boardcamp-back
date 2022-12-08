import { connection } from "../databases/database.js"
import { categorieSchema } from "../schemas/categories.schema.js"

export async function validateCategories (req, res, next) {
    const categorie = req.body

    const validation = categorieSchema.validate(categorie)
    if (validation.error) {
        res.status(400).send(validation.error.details)
        return 
    }

    const existance = await connection.query("SELECT * FROM categories WHERE name = $1", [categorie.name])
    if (existance.rowCount !== 0) {
        res.status(409).send("Categoria já cadastrada.")
        return 
    }

    req.name = categorie.name
    next()
}