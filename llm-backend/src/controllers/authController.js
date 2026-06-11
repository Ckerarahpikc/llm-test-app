import { prisma } from "../db/index.js";
import catchPromise from "../utils/catchPromise.js";

export const getAllUsers = catchPromise(async (req, res, next) => {
  const allUsers = await prisma.conversations.findFirst();

  res.status(200).json({
    status: "success",
    message:
      "There should be users. But they're not because I'm a bad programmer. And I don't know how prisma works, yet.",
    data: { allUsers },
  });
});
