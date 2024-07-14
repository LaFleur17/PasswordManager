// controllers/passwordCollaborationController.js

const Password = require('../models/Password');
const User = require('../models/User');

// Fonction pour ajouter un collaborateur à un mot de passe partagé
const addCollaborator = async (req, res, next) => {
  const { passwordId, collaboratorId } = req.body;

  try {
    // Vérifier si le mot de passe existe
    const password = await Password.findById(passwordId);
    if (!password) {
      return res.status(404).json({ message: 'Mot de passe non trouvé' });
    }

    // Vérifier si l'utilisateur existe
    const collaborator = await User.findById(collaboratorId);
    if (!collaborator) {
      return res.status(404).json({ message: 'Collaborateur non trouvé' });
    }

    // Vérifier si l'utilisateur actuel est autorisé à modifier ce mot de passe
    if (password.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Vous n\'êtes pas autorisé à ajouter un collaborateur à ce mot de passe' });
    }

    // Vérifier si le collaborateur est déjà ajouté
    if (password.sharedWith.includes(collaboratorId)) {
      return res.status(400).json({ message: 'Ce collaborateur est déjà ajouté à ce mot de passe' });
    }

    // Ajouter le collaborateur au mot de passe partagé
    password.sharedWith.push(collaboratorId);
    await password.save();

    res.json({ message: 'Collaborateur ajouté avec succès au mot de passe partagé' });
  } catch (error) {
    console.error('Erreur lors de l\'ajout du collaborateur au mot de passe:', error.message);
    res.status(500).send('Erreur Serveur');
  }
};

module.exports = {
  addCollaborator,
};

