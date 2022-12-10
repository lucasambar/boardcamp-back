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

export async function getGames (req, res) {
    try {
        const games = await connection.query('SELECT games.*, categories.name AS "categoryName" FROM games JOIN categories ON games."categoryId"=categories.id')
        res.send(games.rows)
    } catch (erro) {
        console.log(erro)
        res.sendStatus(500)
    }
}