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

// Création d'une fiche de mots de passe
exports.createPassword = async (req, res) => {
  try {
    const { service, tags, username, password, url, comments } = req.body;

    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(process.env.ENCRYPTION_KEY, 'hex'), iv);
    let encryptedPassword = cipher.update(password, 'utf8', 'hex');
    encryptedPassword += cipher.final('hex');

    const newPassword = new Password({
      userId: req.user.id,
      service,
      tags,
      username,
      password: encryptedPassword,
      iv: iv.toString('hex'),
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

    Object.assign(password, req.body);

    if (req.body.password) {
      const iv = crypto.randomBytes(16);
      const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(process.env.ENCRYPTION_KEY, 'hex'), iv);
      let encryptedPassword = cipher.update(req.body.password, 'utf8', 'hex');
      encryptedPassword += cipher.final('hex');
      password.password = encryptedPassword;
      password.iv = iv.toString('hex');
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

// Route pour obtenir un mot de passe spécifique
exports.getPassword = async (req, res) => {
  try {
    const password = await Password.findById(req.params.id);

    if (!password) {
      return res.status(404).json({ message: 'Password not found' });
    }

    if (password.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    const decryptedPassword = password.decryptPassword();

    res.status(200).json({ password: decryptedPassword });
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


