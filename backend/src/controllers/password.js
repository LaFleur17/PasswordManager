const Password = require('../models/Password');
const crypto = require('crypto');
const clipboardy = require('node-clipboardy');

// Fonction pour générer des mots de passe forts
const generateStrongPassword = () => {
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";
  let password = "";
  for (let i = 0; i < 16; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    password += chars[randomIndex];
  }
  return password;
};

console.log(generateStrongPassword()); // Exemple d'utilisation pour générer un mot de passe
// Création d'une fiche de mots de passe
exports.createPassword = async (req, res) => {
  try {
    const { siteName, tags, username, password, url, comments } = req.body;

    // Chiffrement du mot de passe avant de l'enregistrer
    const cipher = crypto.createCipher('aes-256-cbc', process.env.ENCRYPTION_KEY);
    let encryptedPassword = cipher.update(password, 'utf8', 'hex');
    encryptedPassword += cipher.final('hex');

    const newPassword = new Password({
      userId: req.user.id,
      siteName,
      tags,
      username,
      password: encryptedPassword,
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

    if (req.body.password) {
      const cipher = crypto.createCipher('aes-256-cbc', process.env.ENCRYPTION_KEY);
      let encryptedPassword = cipher.update(req.body.password, 'utf8', 'hex');
      encryptedPassword += cipher.final('hex');
      password.password = encryptedPassword;
    }

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
    // Rechercher le mot de passe par ID
    const password = await Password.findById(req.params.id);

    if (!password) {
      return res.status(404).json({ message: 'Password not found' });
    }

    // Vérification de l'utilisateur
    if (password.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    // Déchiffrer le mot de passe
    const decryptedPassword = password.decryptPassword();

    // Copier le mot de passe dans le presse-papiers
    clipboardy.writeSync(decryptedPassword);

    // Mise à jour de la date de la dernière copie
    password.lastCopied = new Date();
    await password.save();

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

