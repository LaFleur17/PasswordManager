const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Contrôleur pour mettre à jour le mot de passe principal de l'utilisateur
const updatePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  try {
    console.log('Request user:', req.user);
    if (!req.user) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Mot de passe actuel incorrect' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.json({ message: 'Mot de passe mis à jour avec succès' });
  } catch (error) {
    console.error('Erreur lors de la mise à jour du mot de passe:', error.message);
    res.status(500).send('Erreur Serveur');
  }
};

// Contrôleur pour mettre à jour l'e-mail de l'utilisateur
const updateEmail = async (req, res) => {
  const { newEmail } = req.body;

  try {
    console.log('Request user:', req.user);
    if (!req.user) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    user.email = newEmail;
    await user.save();

    res.json({ message: 'E-mail mis à jour avec succès' });
  } catch (error) {
    console.error('Erreur lors de la mise à jour de l\'e-mail:', error.message);
    res.status(500).send('Erreur Serveur');
  }
};

module.exports = {
  updatePassword,
  updateEmail,
};

