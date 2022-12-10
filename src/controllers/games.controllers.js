import {connection} from "../databases/database.js"

export async function postGame (req, res) {
    const {name, image, stockTotal, categoryId, pricePerDay} = req.game

    try {
        await connection.query('INSERT INTO games (name,image,"stockTotal","categoryId","pricePerDay") VALUES ($1,$2,$3,$4,$5)',
        [name, image, stockTotal, categoryId, pricePerDay])
        res.sendStatus(201)
    } catch (erro) {
        console.log(erro)
        res.sendStatus(500)
    }
}