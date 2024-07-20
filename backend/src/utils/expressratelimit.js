const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limite chaque IP à 100 requêtes par fenêtre
  message: 'Trop de requêtes, veuillez réessayer plus tard',
  onLimitReached: (req, res, options) => {
    console.log(`Limite atteinte pour IP: ${req.ip}`);
  }
});

module.exports = limiter;
