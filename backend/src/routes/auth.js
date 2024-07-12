// backend/src/routes/authRoutes.js
const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");

// Route pour l'inscription (register)
router.post("/register", authController.register);

// Route pour la connexion (login)
router.post("/login", authController.login);

module.exports = router;
