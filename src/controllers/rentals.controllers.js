import { connection } from "../databases/database.js"

export async function postNewRent (req, res) {
    const { customerId, gameId, rentDate, daysRented, returnDate, originPrice, delayFee} = req.rent

    try {
        await connection
        .query('INSERT INTO rentals ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice","delayFee") VALUES ($1,$2,$3,$4,$5,$6,$7)',
        [customerId, gameId, rentDate, daysRented, returnDate, originPrice, delayFee])

        res.sendStatus(201)
    } catch (erro) {
        console.log(erro)
        res.sendStatus(500)
        return
    }
}