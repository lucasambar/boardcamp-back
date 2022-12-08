import { connection } from "../databases/database.js"
import { customerSchema } from "../schemas/customer.schema.js"

export async function customersValidation (req, res, next) {
    const customer = req.body
    const id = req.params.id

    const validation = customerSchema.validate(customer, {abortEarly: false})
    if (validation.error) {
        const erros = validation.error.details.map((detail) => detail.message);
        res.status(400).send(erros)
        return
    }

    try {
        const existance = await connection.query("SELECT * FROM customers WHERE cpf = $1", [customer.cpf])
        console.log(existance)
        if (existance.rowCount !== 0) {
            if (!id) {
                res.status(209).send("Cliente já cadastrado.")
                return 
            }
        }

    } catch (erro) {
        console.log(erro)
        res.sendStatus(500)
    }

    req.customer = customer
    next()
}