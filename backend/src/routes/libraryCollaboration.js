// routes/libraryCollaboration.js
const express = require('express');
const { authenticate } = require('../middlewares/auth');
const libraryCollaborationController = require('../controllers/libraryCollaborationController');
const router = express.Router();

router.use(authenticate);

// Route pour ajouter un collaborateur à une bibliothèque partagée
router.put('/add-collaborator/library', libraryCollaborationController.addCollaboratorToLibrary);

// Route pour retirer un collaborateur d'une bibliothèque partagée
router.put('/remove-collaborator', libraryCollaborationController.removeCollaboratorFromLibrary);

module.exports = router;

