// GLOBAL ERROR CATCH CONTROLLER
// it will catch every error occurs in our app
// if and only the routes didn't catch any queries
require("dotenv").config();
const { handleErrorsType } = require("./../utils/handleErrorsType"); // handleErrorsType(name<String>, error<Object>);

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  const handledError = handleErrorsType(err.name || err.code, err) || err;
  const nodeenv = process.env.NODE_ENV;

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
