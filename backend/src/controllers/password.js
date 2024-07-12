// backend/src/controllers/passwordController.js
const Password = require('../models/Password');
const crypto = require('crypto');
const clipboardy = require('node-clipboardy');

// Fonction pour générer des mots de passe forts
const generateStrongPassword = () => {
  return crypto.randomBytes(12).toString('hex'); // Génère un mot de passe aléatoire de 12 caractères
};

// Création d'une fiche de mots de passe
exports.createPassword = async (req, res) => {
  try {
    const { siteName, customName, username, password, url, comments } = req.body;
    // Chiffrement du mot de passe avant de l'enregistrer
    const encryptedPassword = crypto.createCipher('aes192', 'secret').update(password, 'utf8', 'hex');
    const newPassword = new Password({
      userId: req.user.id,
      siteName,
      customName,
      username,
      encryptedPassword,
      url,
      comments
    });
    await newPassword.save();
    res.status(201).json(newPassword);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Lecture des fiches de mots de passe
exports.getPasswords = async (req, res) => {
  try {
    const passwords = await Password.find({ userId: req.user.id });
    res.status(200).json(passwords);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Mise à jour d'une fiche de mots de passe
exports.updatePassword = async (req, res) => {
  try {
    const password = await Password.findById(req.params.id);
    if (!password) {
      return res.status(404).json({ message: 'Password not found' });
    }
    if (password.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    // Mettre à jour les champs nécessaires
    Object.assign(password, req.body);
    await password.save();
    res.status(200).json(password);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Suppression d'une fiche de mots de passe
exports.deletePassword = async (req, res) => {
  try {
    const password = await Password.findById(req.params.id);
    if (!password) {
      return res.status(404).json({ message: 'Password not found' });
    }
    if (password.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    await password.remove();
    res.status(200).json({ message: 'Password deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Copier le mot de passe dans le presse-papiers
exports.copyPasswordToClipboard = async (req, res) => {
  try {
    const password = await Password.findById(req.params.id);
    if (!password) {
      return res.status(404).json({ message: 'Password not found' });
    }
    if (password.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    const decryptedPassword = password.decryptPassword();
    clipboardy.writeSync(decryptedPassword);
    res.status(200).json({ message: 'Password copied to clipboard' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Générateur de mots de passe forts
exports.generateStrongPassword = (req, res) => {
  try {
    const strongPassword = generateStrongPassword();
    res.status(200).json({ password: strongPassword });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

