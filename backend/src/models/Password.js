const mongoose = require("mongoose");
const crypto = require("crypto");

const passwordSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    siteName: {
      type: String,
      required: true,
    },
    customName: {
      type: String,
    },
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    url: {
      type: String,
    },
    comments: {
      type: String,
    },
  },
  { timestamps: true }
);

// Méthode pour chiffrer le mot de passe avant de sauvegarder
passwordSchema.pre("save", function(next) {
  if (!this.isModified("password")) return next();
  
  // Chiffrement du mot de passe
  const cipher = crypto.createCipher('aes-256-cbc', process.env.ENCRYPTION_KEY);
  let encrypted = cipher.update(this.password, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  this.password = encrypted;
  
  next();
});

// Méthode pour déchiffrer le mot de passe
passwordSchema.methods.decryptPassword = function() {
  const decipher = crypto.createDecipher('aes-256-cbc', process.env.ENCRYPTION_KEY);
  let decrypted = decipher.update(this.password, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
};

const Password = mongoose.model("Password", passwordSchema);

module.exports = Password;

