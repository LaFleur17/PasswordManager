const mongoose = require("mongoose");
const crypto = require("crypto");
const validator = require("validator");

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
      trim: true,
      minlength: 3,
      maxlength: 50,
    },
    customName: {
      type: String,
      trim: true,
      maxlength: 50,
    },
    username: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 20,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 8,
      validate: {
        validator: function(value) {
          return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,30}$/.test(value);
        },
        message: "Password must contain at least 8 characters, including at least one uppercase letter, one lowercase letter, one number and one special character",
      }
    },
    url: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
      validate: {
        validator: function(value) {
          return /^(http|https):\/\/[^ "]+$/.test(value);
        },
        message: 'URL non valide'
      }
    },
    comments: {
      type: String,
      maxlength: 500,
      trim: true,
    },
  },
  { timestamps: true }
);

passwordSchema.pre("save", function(next) {
  if (!this.isModified("password")) return next();

  const cipher = crypto.createCipher('aes-256-cbc', process.env.ENCRYPTION_KEY);
  let encrypted = cipher.update(this.password, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  this.password = encrypted;

  next();
});

passwordSchema.methods.decryptPassword = function() {
  const decipher = crypto.createDecipher('aes-256-cbc', process.env.ENCRYPTION_KEY);
  let decrypted = decipher.update(this.password, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
};

const Password = mongoose.model("Password", passwordSchema);

module.exports = Password;

