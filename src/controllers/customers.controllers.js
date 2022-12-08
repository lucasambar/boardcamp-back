import { connection } from "../databases/database.js"

export async function getCustomers (req, res) {
    const cpf = req.query.cpf
    console.log(cpf)
    try {
        
         if (cpf) {
             const customers = await connection.query("SELECT * FROM customers WHERE cpf LIKE %$1", [cpf])
             res.send(customers.rows)
         } else {
            const customers = await connection.query("SELECT * FROM customers")
            res.send(customers.rows)
         }
        
    } catch (erro) {
        console.log(erro)
        res.sendStatus(500)
    }
}