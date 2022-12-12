import dayjs from "dayjs";
import { connection } from "../databases/database.js";
import { rentalSchema } from "../schemas/rental.schema.js"

export async function newRent (req, res, next) {
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
        originalPrice: 0,
        delayFee:null
    }

    try{
        const customer = await connection.query("SELECT * FROM customers WHERE id=$1", [customerId])
        if (customer.rowCount === 0) {res.status(400).send("Jogo nao encontrado."); return}

        const game = await connection.query("SELECT * FROM games WHERE id=$1", [gameId])
        if (game.rowCount === 0) {res.status(400).send("Jogo nao encontrado."); return}

        rent.originalPrice = Number(game.rows[0].pricePerDay) * Number(daysRented)
    } catch (erro) {
        console.log(erro)
        res.sendStautus(500)
        return
    }
    
    req.rent = rent
    next()
}

export async function returnRent (req, res, next) {
    const id = req.params.id

    try {
        const existance = await connection.query('SELECT * FROM rentals WHERE id=$1',[id])
        if (existance.rowCount===0) {res.status(404).send("Registro não encontrado"); return}

        const rent = existance.rows[0]
        if (rent.returnDate !== null) {res.status(400).sendStatus("Aluguel já finalizado"); return}

        rent.returnDate = dayjs().format('YYYY-MM-DD')
        rent.rentDate = dayjs(rent.rentDate).format('YYYY-MM-DD')

        let start =  rent.rentDate.split("-")
        start = Number(start[2])
        let end =  rent.returnDate.split("-")
        end = Number(end[2])
        const daysRented = Number(rent.daysRented)
        const difference = end - start - daysRented

        if (difference > 0) {
            rent.delayFee = (difference) * (Number(rent.originalPrice)/Number(rent.daysRented))
        } else {
            rent.delayFee = 0
        }

        req.rent = rent
        console.log(rent, id)
        req.id = id
        next()
    } catch (erro) {
        console.log(erro)
        res.sendStatus(500)
    }
}