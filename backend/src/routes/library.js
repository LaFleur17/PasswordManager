// routes/library.js
const express = require('express');
const { authenticate } = require('../middlewares/auth');
const libraryController = require('../controllers/libraryController');
const LibraryController = require('../controllers/libraryPasswordController');
const router = express.Router();

router.use(authenticate);

// Route pour créer une nouvelle bibliothèque
router.post('/', libraryController.createLibrary);

// Route pour obtenir toutes les bibliothèques de l'utilisateur
router.get('/', libraryController.getLibraries);

// Route pour mettre à jour une bibliothèque
router.put('/:id', libraryController.updateLibrary);

// Route pour supprimer une bibliothèque
router.delete('/:id', libraryController.deleteLibrary);

// Route pour ajouter un mot de passe à une bibliothèque
router.post('/add-password', LibraryController.addPasswordToLibrary);

// Route pour mettre à jour un mot de passe dans une bibliothèque
router.put('/update-password', LibraryController.updatePasswordInLibrary);

// Route pour supprimer un mot de passe d'une bibliothèque
router.delete('/delete-password', LibraryController.deletePasswordFromLibrary);

module.exports = router;

