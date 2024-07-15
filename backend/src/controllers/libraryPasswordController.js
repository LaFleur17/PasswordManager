// controllers/libraryController.js
const Library = require('../models/Library');
const Password = require('../models/Password');

// Ajouter un mot de passe à une bibliothèque
const addPasswordToLibrary = async (req, res, next) => {
  const { libraryId, passwordData } = req.body;

  try {
    // Vérifier si la bibliothèque existe
    const library = await Library.findById(libraryId);
    if (!library) {
      return res.status(404).json({ message: 'Bibliothèque non trouvée' });
    }

    // Créer un nouveau mot de passe
    const newPassword = new Password(passwordData);
    await newPassword.save();

    // Ajouter le mot de passe à la bibliothèque
    library.passwords.push(newPassword._id);
    await library.save();

    res.json({ message: 'Mot de passe ajouté à la bibliothèque avec succès', newPassword });
  } catch (error) {
    console.error('Erreur lors de l\'ajout du mot de passe à la bibliothèque:', error.message);
    res.status(500).send('Erreur Serveur');
  }
};

// Mettre à jour un mot de passe dans une bibliothèque
const updatePasswordInLibrary = async (req, res, next) => {
  const { libraryId, passwordId, updatedPasswordData } = req.body;

  try {
    // Vérifier si la bibliothèque existe
    const library = await Library.findById(libraryId);
    if (!library) {
      return res.status(404).json({ message: 'Bibliothèque non trouvée' });
    }

    // Vérifier si le mot de passe fait partie de la bibliothèque
    if (!library.passwords.includes(passwordId)) {
      return res.status(400).json({ message: 'Le mot de passe ne fait pas partie de cette bibliothèque' });
    }

    // Mettre à jour les données du mot de passe
    const updatedPassword = await Password.findByIdAndUpdate(passwordId, updatedPasswordData, { new: true });

    res.json({ message: 'Mot de passe mis à jour dans la bibliothèque avec succès', updatedPassword });
  } catch (error) {
    console.error('Erreur lors de la modification du mot de passe dans la bibliothèque:', error.message);
    res.status(500).send('Erreur Serveur');
  }
};

// Supprimer un mot de passe d'une bibliothèque
const deletePasswordFromLibrary = async (req, res, next) => {
  const { libraryId, passwordId } = req.body;

  try {
    // Vérifier si la bibliothèque existe
    const library = await Library.findById(libraryId);
    if (!library) {
      return res.status(404).json({ message: 'Bibliothèque non trouvée' });
    }

    // Vérifier si le mot de passe fait partie de la bibliothèque
    if (!library.passwords.includes(passwordId)) {
      return res.status(400).json({ message: 'Le mot de passe ne fait pas partie de cette bibliothèque' });
    }

    // Supprimer le mot de passe de la bibliothèque
    library.passwords = library.passwords.filter(id => id.toString() !== passwordId.toString());
    await library.save();

    // Supprimer le mot de passe de la collection Password
    await Password.findByIdAndDelete(passwordId);

    res.json({ message: 'Mot de passe supprimé de la bibliothèque avec succès' });
  } catch (error) {
    console.error('Erreur lors de la suppression du mot de passe de la bibliothèque:', error.message);
    res.status(500).send('Erreur Serveur');
  }
};

module.exports = {
  addPasswordToLibrary,
  updatePasswordInLibrary,
  deletePasswordFromLibrary,
};

