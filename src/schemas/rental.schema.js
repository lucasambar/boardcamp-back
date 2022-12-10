import Joi from "joi";

export const rentalSchema = Joi.object({
    customerId: Joi.number().greater(0).required(),
    gameId: Joi.number().greater(0).required(), 
    daysRented: Joi.number().greater(0).required(),  
})