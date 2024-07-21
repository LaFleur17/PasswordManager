const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limite chaque IP à 100 requêtes par fenêtre
  // La configuration `onLimitReached` est supprimée
  message: 'Too many requests from this IP, please try again later.', // Message à retourner en cas de dépassement
});

module.exports = limiter;

