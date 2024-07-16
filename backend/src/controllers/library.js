const Library = require('../models/Library');
const User = require('../models/User');
const Password = require('../models/Password');

// Créer une nouvelle bibliothèque
const createLibrary = async (req, res) => {
  const { name } = req.body;
  const owner = req.user._id; // L'utilisateur connecté est le propriétaire de la bibliothèque

  try {
    const newLibrary = await Library.create({ name, owner });
    res.status(201).json(newLibrary);
  } catch (error) {
    console.error('Error creating library:', error.message);
    res.status(500).json({ message: 'Failed to create library' });
  }
};

// Obtenir toutes les bibliothèques de l'utilisateur connecté
const getLibraries = async (req, res) => {
  const userId = req.user._id;

  try {
    const libraries = await Library.find({ $or: [{ owner: userId }, { 'collaborators.user': userId }] });
    res.json(libraries);
  } catch (error) {
    console.error('Error fetching libraries:', error.message);
    res.status(500).json({ message: 'Failed to fetch libraries' });
  }
};

// Obtenir une bibliothèque spécifique par son ID
const getLibraryById = async (req, res) => {
  const libraryId = req.params.libraryId;

  try {
    const library = await Library.findById(libraryId).populate('passwords.password');
    if (!library) {
      return res.status(404).json({ message: 'Library not found' });
    }

    // Vérifier si l'utilisateur a accès à cette bibliothèque
    if (!library.owner.equals(req.user._id) && !library.collaborators.some(c => c.user.equals(req.user._id))) {
      return res.status(403).json({ message: 'Access denied' });
    }

    res.json(library);
  } catch (error) {
    console.error('Error fetching library:', error.message);
    res.status(500).json({ message: 'Failed to fetch library' });
  }
};

// Mettre à jour une bibliothèque spécifique par son ID
const updateLibrary = async (req, res) => {
  const libraryId = req.params.libraryId;
  const { name } = req.body;

  try {
    let library = await Library.findById(libraryId);
    if (!library) {
      return res.status(404).json({ message: 'Library not found' });
    }

    // Vérifier si l'utilisateur est propriétaire de la bibliothèque
    if (!library.owner.equals(req.user._id)) {
      return res.status(403).json({ message: 'Only the owner can update the library' });
    }

    library.name = name;
    await library.save();

    res.json({ message: 'Library updated successfully' });
  } catch (error) {
    console.error('Error updating library:', error.message);
    res.status(500).json({ message: 'Failed to update library' });
  }
};

// Supprimer une bibliothèque spécifique par son ID
const deleteLibrary = async (req, res) => {
  const libraryId = req.params.libraryId;

  try {
    const library = await Library.findById(libraryId);
    if (!library) {
      return res.status(404).json({ message: 'Library not found' });
    }

    // Vérifier si l'utilisateur est propriétaire de la bibliothèque
    if (!library.owner.equals(req.user._id)) {
      return res.status(403).json({ message: 'Only the owner can delete the library' });
    }

    await library.remove();

    res.json({ message: 'Library deleted successfully' });
  } catch (error) {
    console.error('Error deleting library:', error.message);
    res.status(500).json({ message: 'Failed to delete library' });
  }
};

// Ajouter un collaborateur à une bibliothèque
const addCollaborator = async (req, res) => {
  const { libraryId, collaboratorId, permission } = req.body;

  try {
    // Vérifier si la bibliothèque existe
    const library = await Library.findById(libraryId);
    if (!library) {
      return res.status(404).json({ message: 'Library not found' });
    }

    // Vérifier si l'utilisateur est propriétaire de la bibliothèque
    if (!library.owner.equals(req.user._id)) {
      return res.status(403).json({ message: 'Only the owner can add collaborators' });
    }

    // Vérifier si le collaborateur existe
    const collaborator = await User.findById(collaboratorId);
    if (!collaborator) {
      return res.status(404).json({ message: 'Collaborator not found' });
    }

    // Vérifier si le collaborateur est déjà ajouté
    if (library.collaborators.some(c => c.user.equals(collaboratorId))) {
      return res.status(400).json({ message: 'Collaborator already added to this library' });
    }

    // Ajouter le collaborateur à la bibliothèque avec la permission spécifiée
    library.collaborators.push({ user: collaboratorId, permission });
    await library.save();

    res.json({ message: 'Collaborator added successfully' });
  } catch (error) {
    console.error('Error adding collaborator:', error.message);
    res.status(500).json({ message: 'Failed to add collaborator' });
  }
};

// Supprimer un collaborateur d'une bibliothèque
const removeCollaborator = async (req, res) => {
  const { libraryId, collaboratorId } = req.params;

  try {
    // Vérifier si la bibliothèque existe
    const library = await Library.findById(libraryId);
    if (!library) {
      return res.status(404).json({ message: 'Library not found' });
    }

    // Vérifier si l'utilisateur est propriétaire de la bibliothèque
    if (!library.owner.equals(req.user._id)) {
      return res.status(403).json({ message: 'Only the owner can remove collaborators' });
    }

    // Vérifier si le collaborateur est présent dans la bibliothèque
    const collaboratorIndex = library.collaborators.findIndex(c => c.user.equals(collaboratorId));
    if (collaboratorIndex === -1) {
      return res.status(404).json({ message: 'Collaborator not found in this library' });
    }

    // Supprimer le collaborateur de la bibliothèque
    library.collaborators.splice(collaboratorIndex, 1);
    await library.save();

    res.json({ message: 'Collaborator removed successfully' });
  } catch (error) {
    console.error('Error removing collaborator:', error.message);
    res.status(500).json({ message: 'Failed to remove collaborator' });
  }
};

// Mettre à jour les permissions d'un collaborateur dans une bibliothèque
const updateCollaboratorPermissions = async (req, res) => {
  const { libraryId, collaboratorId } = req.params;
  const { permission } = req.body;

  try {
    // Vérifier si la bibliothèque existe
    const library = await Library.findById(libraryId);
    if (!library) {
      return res.status(404).json({ message: 'Library not found' });
    }

    // Vérifier si l'utilisateur est propriétaire de la bibliothèque
    if (!library.owner.equals(req.user._id)) {
      return res.status(403).json({ message: 'Only the owner can update collaborator permissions' });
    }

    // Vérifier si le collaborateur est présent dans la bibliothèque
    const collaborator = library.collaborators.find(c => c.user.equals(collaboratorId));
    if (!collaborator) {
      return res.status(404).json({ message: 'Collaborator not found in this library' });
    }

    // Mettre à jour les permissions du collaborateur
    collaborator.permission = permission;
    await library.save();

    res.json({ message: 'Collaborator permissions updated successfully' });
  } catch (error) {
    console.error('Error updating collaborator permissions:', error.message);
    res.status(500).json({ message: 'Failed to update collaborator permissions' });
  }
};

// Ajouter un mot de passe existant à une bibliothèque
const addPasswordToLibrary = async (req, res) => {
  const { libraryId, passwordId } = req.body;

  try {
    // Vérifier si la bibliothèque existe
    const library = await Library.findById(libraryId);
    if (!library) {
      return res.status(404).json({ message: 'Library not found' });
    }

    // Vérifier si l'utilisateur a accès à cette bibliothèque
    if (!library.owner.equals(req.user._id) && !library.collaborators.some(c => c.user.equals(req.user._id))) {
      return res.status(403).json({ message: 'Access denied' });
    }

    // Vérifier si le mot de passe existe
    const password = await Password.findById(passwordId);
    if (!password) {
      return res.status(404).json({ message: 'Password not found' });
    }

    // Vérifier si le mot de passe est déjà ajouté à la bibliothèque
    if (library.passwords.some(p => p.password.equals(passwordId))) {
      return res.status(400).json({ message: 'Password already added to this library' });
    }

    // Ajouter le mot de passe à la bibliothèque
    library.passwords.push({ password: passwordId, addedBy: req.user._id });
    await library.save();

    res.json({ message: 'Password added successfully to library' });
  } catch (error) {
    console.error('Error adding password to library:', error.message);
    res.status(500).json({ message: 'Failed to add password to library' });
  }
};

// Supprimer un mot de passe d'une bibliothèque
const removePasswordFromLibrary = async (req, res) => {
  const { libraryId, passwordId } = req.params;

  try {
    // Vérifier si la bibliothèque existe
    const library = await Library.findById(libraryId);
    if (!library) {
      return res.status(404).json({ message: 'Library not found' });
    }

    // Vérifier si l'utilisateur a accès à cette bibliothèque
    if (!library.owner.equals(req.user._id) && !library.collaborators.some(c => c.user.equals(req.user._id))) {
      return res.status(403).json({ message: 'Access denied' });
    }

    // Vérifier si le mot de passe est présent dans la bibliothèque
    const passwordIndex = library.passwords.findIndex(p => p.password.equals(passwordId));
    if (passwordIndex === -1) {
      return res.status(404).json({ message: 'Password not found in this library' });
    }

    // Supprimer le mot de passe de la bibliothèque
    library.passwords.splice(passwordIndex, 1);
    await library.save();

    res.json({ message: 'Password removed successfully from library' });
  } catch (error) {
    console.error('Error removing password from library:', error.message);
    res.status(500).json({ message: 'Failed to remove password from library' });
  }
};

module.exports = {
  createLibrary,
  getLibraries,
  getLibraryById,
  updateLibrary,
  deleteLibrary,
  addCollaborator,
  removeCollaborator,
  updateCollaboratorPermissions,
  addPasswordToLibrary,
  removePasswordFromLibrary,
};

