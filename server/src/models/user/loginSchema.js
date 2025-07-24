import Joi from "joi";

export const loginSchema = Joi.object({
  email: Joi.string().trim().email(),
  password: Joi.string()
    .trim()
    .pattern(
      new RegExp(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@#$%&*])[A-Za-z\\d@#$%&*]{6,30}$"
      )
    ),
});
