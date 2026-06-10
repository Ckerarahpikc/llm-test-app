const SetUpError = require("./SetUpError");

// ^ HANDLING ERRORS
exports.handleErrorsType = (name, error) => {
  switch (name) {
    case "CastError":
      // assigning something incorrect
      const caseMessage = `Invalid ${error.path} set to the value ${error.value}.`;
      return new SetUpError(caseMessage, 400);

    case 11000:
      // assigning something that is already in use
      const duplicationMessage = `Duplication error. What you want to add right now is already there.`;

      return new SetUpError(duplicationMessage, 400);

    case "ValidationError":
      const errorMessages = Object.values(error.errors).map((el) => el.message);

      // padding errorMessages to error so we can use it in continue
      error.errorMessages = errorMessages;
      const validationMessage = `Error on assigning values. ${errorMessages.join(
        " ",
      )}`;
      return new SetUpError(validationMessage, 400);

    case "TokenExpiredError":
      // some invalid token errors
      const tokenMessage = `Token error, try log in again. Message: ${error.message}`;
      return new SetUpError(tokenMessage, 401);

    default:
      return 0;
  }
};
