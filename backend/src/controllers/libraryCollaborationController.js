// controllers/libraryCollaborationController.js
const Library = require('../models/Library');
const User = require('../models/User');

// Fonction pour ajouter un collaborateur à une bibliothèque partagée
const addCollaboratorToLibrary = async (req, res, next) => {
  const { libraryId, collaboratorId } = req.body;

  try {
    // Vérifier si la bibliothèque existe
    const library = await Library.findById(libraryId);
    if (!library) {
      return res.status(404).json({ message: 'Bibliothèque non trouvée' });
    }

    // Vérifier si le collaborateur existe
    const collaborator = await User.findById(collaboratorId);
    if (!collaborator) {
      return res.status(404).json({ message: 'Collaborateur non trouvé' });
    }

    // Vérifier si l'utilisateur actuel est autorisé à modifier cette bibliothèque
    if (library.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Vous n\'êtes pas autorisé à ajouter un collaborateur à cette bibliothèque' });
    }

    // Vérifier si le collaborateur est déjà ajouté
    if (library.sharedWith.includes(collaboratorId)) {
      return res.status(400).json({ message: 'Ce collaborateur est déjà ajouté à cette bibliothèque' });
    }

    // Ajouter le collaborateur à la bibliothèque partagée
    library.sharedWith.push(collaboratorId);
    await library.save();

    res.json({ message: 'Collaborateur ajouté avec succès à la bibliothèque partagée' });
  } catch (error) {
    console.error('Erreur lors de l\'ajout du collaborateur à la bibliothèque:', error.message);
    res.status(500).send('Erreur Serveur');
  }
};

// Fonction pour retirer un collaborateur d'une bibliothèque partagée
const removeCollaboratorFromLibrary = async (req, res, next) => {
  const { libraryId, collaboratorId } = req.body;

  try {
    // Vérifier si la bibliothèque existe
    const library = await Library.findById(libraryId);
    if (!library) {
      return res.status(404).json({ message: 'Bibliothèque non trouvée' });
    }

    // Vérifier si l'utilisateur actuel est autorisé à modifier cette bibliothèque
    if (library.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Vous n\'êtes pas autorisé à retirer un collaborateur de cette bibliothèque' });
    }

    // Retirer le collaborateur de la bibliothèque partagée
    library.sharedWith = library.sharedWith.filter(id => id.toString() !== collaboratorId);
    await library.save();

    res.json({ message: 'Collaborateur retiré avec succès de la bibliothèque partagée' });
  } catch (error) {
    console.error('Erreur lors du retrait du collaborateur de la bibliothèque:', error.message);
    res.status(500).send('Erreur Serveur');
  }
};

module.exports = {
  addCollaboratorToLibrary,
  removeCollaboratorFromLibrary,
};

