import { connection } from "../databases/database.js"

export async function getCategories (req, res) {
    try {
        const categories = await connection.query("SELECT * FROM categories")
        res.status(200).send(categories.rows)
    } catch (erro) {
        console.log(erro)
        res.sendStatus(500)
    }
}