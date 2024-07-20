const validatePassword = (password) => {
  // Vérifier la longueur du mot de passe
  if (password.length < 12) {
    return "Password must be at least 12 characters long";
  }

  // Vérifier s'il contient au moins une lettre majuscule
  if (!/[A-Z]/.test(password)) {
    return "Password must contain at least one uppercase letter";
  }

  // Vérifier s'il contient au moins une lettre minuscule
  if (!/[a-z]/.test(password)) {
    return "Password must contain at least one lowercase letter";
  }

  // Vérifier s'il contient au moins un chiffre
  if (!/[0-9]/.test(password)) {
    return "Password must contain at least one digit";
  }

  // Vérifier s'il contient au moins un caractère spécial
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    return "Password must contain at least one special character";
  }

  return null;
};

module.exports = { validatePassword };

