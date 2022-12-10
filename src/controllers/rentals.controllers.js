import { connection } from "../databases/database.js"

export async function postNewRent (req, res) {
    const { customerId, gameId, rentDate, daysRented, returnDate, originalPrice, delayFee} = req.rent

    try {
        await connection
        .query('INSERT INTO rentals ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice","delayFee") VALUES ($1,$2,$3,$4,$5,$6,$7)',
        [customerId, gameId, rentDate, daysRented, returnDate, originalPrice, delayFee])

        res.sendStatus(201)
    } catch (erro) {
        console.log(erro)
        res.sendStatus(500)
        return
    }
}

export async function postReturnRent (req, res) {
    const {returnDate, delayFee} = req.rent
    const {id} = req.id

    try {
        await connection.query('UPDATE rentals SET "returnDate"=$1, "delayFee"=$2 WHERE id=$3',
        [returnDate, delayFee,id])
        res.sendStatus(201)
    } catch (erro) {
        console.log(erro)
        res.sendStatus(500)
    }
}