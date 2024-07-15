// controllers/libraryController.js
const Library = require("../models/Library");

// Fonction pour créer une nouvelle bibliothèque
const createLibrary = async (req, res, next) => {
  const { name, description } = req.body;
  const userId = req.user._id;

  try {
    const newLibrary = new Library({ name, description, userId });
    await newLibrary.save();
    res.status(201).json(newLibrary);
  } catch (error) {
    next(error);
  }
};

// Fonction pour obtenir toutes les bibliothèques de l'utilisateur
const getLibraries = async (req, res, next) => {
  const userId = req.user._id;

  try {
    const libraries = await Library.find({
      $or: [
        { userId },
        { sharedWith: userId },
      ],
    }).populate('passwords');
    res.status(200).json(libraries);
  } catch (error) {
    next(error);
  }
};

// Fonction pour mettre à jour une bibliothèque
const updateLibrary = async (req, res, next) => {
  const { id } = req.params;
  const { name, description } = req.body;
  const userId = req.user._id;

  try {
    const library = await Library.findOneAndUpdate(
      { _id: id, userId },
      { name, description },
      { new: true }
    );

    if (!library) {
      return res.status(404).json({ message: "Library not found or you are not authorized to update this library" });
    }

    res.status(200).json(library);
  } catch (error) {
    next(error);
  }
};

// Fonction pour supprimer une bibliothèque
const deleteLibrary = async (req, res, next) => {
  const { id } = req.params;
  const userId = req.user._id;

  try {
    const library = await Library.findOneAndDelete({ _id: id, userId });

    if (!library) {
      return res.status(404).json({ message: "Library not found or you are not authorized to delete this library" });
    }

    res.status(200).json({ message: "Library deleted successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createLibrary,
  getLibraries,
  updateLibrary,
  deleteLibrary,
};

