import express from "express";

import * as userController from "../controllers/userController.js";
const router = express.Router();

// AUTHENTICATION ROUTES

// router.post("/login", userController.login);
// router.post("/register", userController.register);
// router.get("/logout", userController.logout);

// USER ROUTES (dev routes)
router.get("/", userController.getAllUsers);

export default router;
