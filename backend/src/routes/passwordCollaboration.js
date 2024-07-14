// routes/passwordCollaboration.js

const express = require('express');
const { authenticate } = require('../middlewares/auth');
const PasswordCollaborationController = require('../controllers/passwordCollaborationController');
const router = express.Router();

// Route pour ajouter un collaborateur à un mot de passe partagé
router.put('/add-collaborator', authenticate, PasswordCollaborationController.addCollaborator);

module.exports = router;

