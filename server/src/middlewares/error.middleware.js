const errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  res.status(err.statusCode).json({
    message: err.message,
    isSuccess: false,
    isError: true,
  });
};

export default errorHandler;
