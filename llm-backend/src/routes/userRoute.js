const router = require("express").Router();

const userController = require("../controllers/userController");

// AUTHENTICATION ROUTES

// router.post("/login", userController.login);
// router.post("/register", userController.register);
// router.get("/logout", userController.logout);

// USER ROUTES (dev routes)
router.get("/", userController.getAllUsers);

module.exports = router;
