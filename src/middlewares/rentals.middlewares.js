import dayjs from "dayjs";
import { connection } from "../databases/database.js";
import { rentalSchema } from "../schemas/rental.schema.js"

export default async function newRent (req, res, next) {
    const body = req.body

    const validation = rentalSchema.validate(body)
    if (validation.error) {
        const erros = validation.error.details.map((detail) => detail.message);
        res.status(400).send(erros)
        return
    }

    const {customerId, gameId, daysRented} = body
    const rent = {
        customerId,
        gameId,
        rentDate: dayjs().format("YYYY-MM-DD"),
        daysRented,
        returnDate: null,
        originPrice: 0,
        delayFee:null
    }

    try{
        const customer = await connection.query("SELECT * FROM customers WHERE id=$1", [customerId])
        if (customer.rowCount === 0) {res.status(400).send("Jogo nao encontrado."); return}

        const game = await connection.query("SELECT * FROM games WHERE id=$1", [gameId])
        if (game.rowCount === 0) {res.status(400).send("Jogo nao encontrado."); return}

        rent.originPrice = Number(game.rows[0].pricePerDay) * Number(daysRented)
    } catch (erro) {
        console.log(erro)
        res.sendStautus(500)
        return
    }
    
    req.rent = rent
    next()
}