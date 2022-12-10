import { connection } from "../databases/database.js";
import { gameSchema } from "../schemas/game.schema.js"

export async function gameValidation (req, res, next) {
    const game = req.body
    
    const validation = gameSchema.validate(game, {abortEarly:false})
    if (validation.error) {
        const erros = validation.error.details.map((detail) => detail.message);
        res.status(400).send(erros)
        return
    }

    try {
        const category = await connection.query("SELECT * FROM categories WHERE id=$1", [game.categoryId])
        if (category.rowCount === 0) {
            res.status(400).send("Essa categoria não existe, tente novamente.")
            return
        }
        
        const existance = await connection.query("SELECT * FROM games WHERE name=$1",[game.name])
        if (existance.rowCount !== 0) {
            res.status(409).send("Jogo já cadastrado!")
            return
        }

    } catch (erro) {
        console.log(game.name)
        console.log(erro)
        res.sendStatus(500)
    }
    
    req.game = game
    next()
}