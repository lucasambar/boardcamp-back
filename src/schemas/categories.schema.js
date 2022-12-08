import Joi from "joi";

export const categorieSchema = Joi.object({
    name: Joi.string().min(3).required()
})