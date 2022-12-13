import { connection } from "../databases/database.js"

export async function postNewRent (req, res) {
    const { customerId, gameId, rentDate, daysRented, returnDate, originalPrice, delayFee} = req.rent

    try {
        const a = await connection
        .query('INSERT INTO rentals ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice","delayFee") VALUES ($1,$2,$3,$4,$5,$6,$7)',
        [customerId, gameId, rentDate, daysRented, returnDate, originalPrice, delayFee])

        res.status(201).send(req.rent)
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
        const a = await connection.query('UPDATE rentals SET "returnDate"=$1, "delayFee"=$2 WHERE id=$3',
        [returnDate, delayFee,id])
        res.status(201).send(req.rent)
    } catch (erro) {
        console.log(erro)
        res.sendStatus(500)
    }
}

export async function getRentals (req, res) {
    try {
        const rentals = await connection
        .query('SELECT rentals.*, customers.* FROM rentals JOIN customers ON rentals."customerId"=customers.id')
        res.send(rentals.rows)
    } catch (erro) {
        console.log(erro)
        res.sendStatus(500)
    }
}

export async function deleteRentals (req, res) {
    const id = req.id

    try {
        await connection.query('DELETE FROM rentals WHERE id=$1',[id])
        res.sendStatus(200)
    } catch (erro) {
        console.log(erro)
        res.sendStatus(500)
    }
}