export const sendSuccessResponse = (res, message, data = {}, statusCode=200) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};