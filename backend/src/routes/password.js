// backend/src/routes/password.js
const express = require('express');
const router = express.Router();
const passwordController = require('../controllers/password');
const { authenticate } = require('../middlewares/auth');
// Middleware d'authentification pour protéger les routes
router.use(authenticate);

// Routes CRUD pour les mots de passe
router.post('/', passwordController.createPassword);
router.get('/', passwordController.getPasswords);
router.get('/:id', passwordController.getPassword);
router.put('/:id', passwordController.updatePassword);
router.delete('/:id', passwordController.deletePassword);

// Route pour générer un mot de passe fort
router.get('/generate', passwordController.generateStrongPassword);

module.exports = router;

