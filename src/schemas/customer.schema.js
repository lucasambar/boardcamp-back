import pkg from 'joi';
const { date } = pkg;
import Joi from "joi";


export const customerSchema = Joi.object({
    name: Joi.string().min(3).required(),
    phone: Joi.string().alphanum().min(10).max(11).required(),
    cpf: Joi.string().allow("1","2","3","4","5","6","7","8","9","0").min(11).max(11).required(),
    birthday: Joi.date().required()
})