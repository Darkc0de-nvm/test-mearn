import { StatusCodes } from "http-status-codes";

const errorHandlerMiddleware = (err, req, res, next) => {
  if (process.env.NODE_ENV === "development") {
    console.error(err);
  }
  const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  const msg = err.message || "Внутрішня помилка сервера, спробуйте пізніше";
  res.status(statusCode).json({ msg });
};

export default errorHandlerMiddleware;
