import CustomError from "../utils/CustomError.js";

export const validateMiddleware = (schema) => (req, res, next) => {
  if (!req.body) {
    return next(new CustomError("All fields are required.", 400));
  }
  const { error, value } = schema.validate(req.body);
  if (error) {
    const message = error.message;
    return next(new CustomError(message, 400));
  }
  req.body = { ...value };
  next();
};
