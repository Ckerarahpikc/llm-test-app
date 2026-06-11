// GLOBAL ERROR CATCH CONTROLLER
// it will catch every error occurs in our app
// if and only the routes didn't catch any queries
import dotenv from "dotenv";
dotenv.config();

import handleErrorsType from "./../utils/handleErrorsType.js"; // handleErrorsType(name<String>, error<Object>);

export default (err, req, res, next) => {
  const handledError = handleErrorsType(err.name || err.code, err) || err;
  const nodeenv = process.env.NODE_ENV?.trim(); // emmiting any spaces (bulletproof)
  err.statusCode = handledError.statusCode || 500;
  err.status = handledError.status || "error";

  if (nodeenv === "development") {
    return res.status(handledError.statusCode).json({
      status: handledError.status,
      message: handledError.message,
      stack: handledError.stack,
      error: handledError,
    });
  }

  if (handledError.isOperational) {
    return res.status(handledError.statusCode).json({
      status: "fail",
      message: handledError.message,
    });
  }

  return res.status(handledError.statusCode).json({
    status: "error",
    message: "Something went wrong. Try again later.",
  });
};
