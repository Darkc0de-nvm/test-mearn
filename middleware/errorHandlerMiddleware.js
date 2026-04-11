import { StatusCodes } from "http-status-codes";

const errorHandlerMiddleware = (err, req, res, next) => {
  console.error(err.stack);
  const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  const msg = err.message || "Внутрішня помилка сервера, спробуйте пізніше";
  res.status(statusCode).json({ msg });
};

export default errorHandlerMiddleware;
