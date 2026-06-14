import express from "express";

import * as authController from "../controllers/authController.js";
const router = express.Router();

// AUTHENTICATION ROUTES

// router.post("/login", userController.login);
// router.post("/register", userController.register);
// router.get("/logout", userController.logout);

// USER ROUTES (dev routes)
router.post("/login", authController.login);
router.post("/register", authController.register);

export default router;
