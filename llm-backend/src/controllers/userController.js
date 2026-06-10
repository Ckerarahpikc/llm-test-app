const { prisma } = require("../db/index");
const catchPromise = require("../utils/catchPromise");

exports.getAllUsers = catchPromise(async (req, res, next) => {
  const users = await prisma.users.findMany();

  if (!users) return next(new SetUpError("Users not found."), 400);

  res.status(200).json({
    status: "success",
    message: {
      users,
    },
  });
});
