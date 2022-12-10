import dayjs from "dayjs"
import { connection } from "../databases/database.js"

export async function getCustomers (req, res) {
    const cpf = req.query.cpf
    const id = req.params.id

    try {
        
         if (cpf) {
             const customers = await connection.query("SELECT * FROM customers WHERE cpf LIKE %$1", [cpf])
             res.send(customers.rows)
         } 

         else if (id) {
            const customers = await connection.query("SELECT * FROM customers WHERE id = $1", [id])
            res.send(customers.rows)
         }
         
         else {
            const customers = await connection.query("SELECT * FROM customers")
            res.send(customers.rows)
         }
        
    } catch (erro) {
        console.log(erro)
        res.sendStatus(500)
    }
}

export async function postCustomer (req, res) {
    const {name, phone, cpf, birthday} = req.customer
    birthday = dayjs(birthday).format("YYYY-MM-DD")

    try {
        await connection.query("INSERT INTO customers (name, phone, cpf, birthday) VALUES ($1, $2, $3, $4)", [name, phone, cpf, birthday])
        res.sendStatus(201)
    } catch (erro) {
        console.log(erro)
        res.sendStatus(500)
    }
}

export async function putCustomer (req, res) {
    const {name, phone, cpf, birthday} = req.customer
    const id = req.id
    birthday = dayjs(birthday).format("YYYY-MM-DD")
    
    try {
        await connection.query("UPDATE customers SET name=$1, phone=$2, cpf=$3, birthday=$4 WHERE id=$5",
        [name, phone, cpf, birthday, id])
        res.sendStatus(200)
    } catch (erro) {
        console.log(erro)
        res.sendStatus(500)
    }
}