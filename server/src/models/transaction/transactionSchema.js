import Joi from "joi";

export const transactionSchema = Joi.object({
  type: Joi.string().trim().min(1).required(),
  amount: Joi.string().trim().min(1).required(),
  category: Joi.string().trim().min(2).optional(),
  walletId: Joi.string().trim().min(24).required(),
  date: Joi.string().trim().min(10).required(),
  description: Joi.string().trim().min(10).max(200).optional(),
});
