const express = require('express');
const router = express.Router();
const libraryController = require('../controllers/library');
const { authenticate } = require('../middlewares/auth');

// Routes pour les bibliothèques

// GET /libraries
router.get('/', authenticate, libraryController.getLibraries);

// GET /libraries/:libraryId
router.get('/:libraryId', authenticate, libraryController.getLibraryById);

// POST /libraries
router.post('/', authenticate, libraryController.createLibrary);

// PUT /libraries/:libraryId
router.put('/:libraryId', authenticate, libraryController.updateLibrary);

// DELETE /libraries/:libraryId
router.delete('/:libraryId', authenticate, libraryController.deleteLibrary);

// POST /libraries/:libraryId/collaborators
router.post('/:libraryId/collaborators', authenticate, libraryController.addCollaborator);

// DELETE /libraries/:libraryId/collaborators/:collaboratorId
router.delete('/:libraryId/collaborators/:collaboratorId', authenticate, libraryController.removeCollaborator);

// PUT /libraries/:libraryId/collaborators/:collaboratorId/permissions
router.put('/:libraryId/collaborators/:collaboratorId/permissions', authenticate, libraryController.updateCollaboratorPermissions);

// POST /libraries/:libraryId/passwords
router.post('/:libraryId/passwords', authenticate, libraryController.addPasswordToLibrary);

// DELETE /libraries/:libraryId/passwords/:passwordId
router.delete('/:libraryId/passwords/:passwordId', authenticate, libraryController.removePasswordFromLibrary);

module.exports = router;

