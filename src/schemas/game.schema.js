import Joi  from "joi";

export const gameSchema = Joi.object({
    name: Joi.string().min(3).required(),
    image: Joi.string().required(),
    stockTotal: Joi.number().greater(0).required(),
    categoryId: Joi.number(),
    pricePerDay: Joi.number().greater(0)
})