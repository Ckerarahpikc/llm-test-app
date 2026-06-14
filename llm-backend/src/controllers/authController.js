import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import ms from "ms";
import { format } from "date-fns";
import { z } from "zod";

import { prisma } from "../db/index.js";
import catchPromise from "../utils/catchPromise.js";
import SetUpError from "../utils/SetUpError.js";

const signToken = (id, userType) => {
  return jwt.sign({ id, userType }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN_TIME,
  });
};

const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

const createToken = (user, statusCode, res) => {
  const { userType, id } = user;
  const newToken = signToken(id, userType); // sign new token

  res.cookie("jwt", newToken, {
    // create new jwt with specifical options
    expires: new Date(Date.now() + ms(process.env.JWT_EXPIRES_IN_TIME)),
    httpOnly: true, // preventing client-side access
    secure: process.env.NODE_ENV === "production", // cookies are send only over https
    sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax", // TODO: check this
  });

  // ensure no password is visible in response
  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    message:
      "There should be users. But they're not because I'm a bad programmer. And I don't know how prisma works, yet.",
    token: newToken,
    data: {
      user,
    },
  });
};

export const login = catchPromise(async (req, res, next) => {
  // 1. get the email and password from the request.body
  const { email, password } = req.body;

  if (!email || !password)
    return next(
      new SetUpError("Email and password fields are required to login.", 400),
    );

  // 2. check if the user have an existing account
  const user = await prisma.users.findFirst({
    // rememeber the password is hashed inside the database so we need to check current password (unhashed) with the database password (hashed)
    where: { email },
  });
  if (!user) {
    return next(
      new SetUpError("Unable to find a user with inserted credentials.", 400),
    );
  }

  // 3. check if passwords are the same as in the db
  const arePasswordsTheSame = await bcrypt.compare(password, user.password);
  if (!arePasswordsTheSame) {
    return next(
      new SetUpError(
        "Email or password are invalid. Please double check, then try again.",
        400,
      ),
    );
  }

  // 4*. update date entered only for admins (to ensure security for any database or other unsigned changes from the admins)
  if (user.usertype === "admin") {
    await prisma.users.update({
      where: { id: user.id },
      data: { date_entered: new Date() }, // overwriting the date
    });
  }

  // 5. create (sign) new jwt token for the current session for the user
  createToken(user, 200, res);
});

export const register = catchPromise(async (req, res, next) => {
  const { name, email, password, passwordConfirm, birthDate } = req.body;

  // 1. check for fields
  if (!name || !email || !password || !passwordConfirm || !birthDate) {
    return next(
      new SetUpError(
        "All fields are required. Please enter valid data then try again.",
        400,
      ),
    );
  }

  // 2. check for password missmatch
  if (passwordConfirm !== password) {
    return next(
      new SetUpError(
        "Password don't match. Check the correctness then try again.",
        400,
      ),
    );
  }

  // 3. check if the users already exists in the db
  const user = await prisma.users.findFirst({
    where: {
      email,
    },
  });

  if (user) {
    // is there any user with the same email?
    return next(
      new SetUpError(
        "There's is already a user with this email. Please log in instead.",
        400,
      ),
    );
  }

  // 4. create a hash for the password to store it in db
  const hashedPassword = await bcrypt.hash(
    password,
    parseInt(process.env.BCRYPT_SECRET_SALT),
  );

  // 5. create new user with proper valid data
  const newUser = await prisma.users.create({
    data: {
      name,
      email,
      password: hashedPassword,
      birth_date: new Date(format(birthDate, "yyyy-MM-dd")),
    },
  });

  // 6. create new token for the current registered user
  createToken(newUser, 200, res);
});

export const deleteUser = catchPromise(async (req, res, next) => {});
