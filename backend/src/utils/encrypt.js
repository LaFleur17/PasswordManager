const bcrypt = require('bcrypt');

// Fonction pour chiffrer un mot de passe
async function hashPassword(password) {
  const saltRounds = 10; // Nombre de rounds de salage
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
}

// Fonction pour vérifier un mot de passe chiffré
async function comparePassword(inputPassword, hashedPassword) {
  return await bcrypt.compare(inputPassword, hashedPassword);
}

module.exports = { hashPassword, comparePassword };

