const mongoose = require("mongoose");
const crypto = require("crypto");
const validator = require("validator");
const logger = require('../utils/logger');
require('dotenv').config();

const ENCRYPTIONENV = process.env.ENCRYPTION_KEY;
if (!ENCRYPTIONENV) {
  throw new Error('ENCRYPTION_KEY is not defined in environment variables');
}
const ENCRYPTION_KEY = Buffer.from(ENCRYPTIONENV, 'hex');
logger.info(`ENCRYPTION_KEY Buffer Length: ${ENCRYPTION_KEY.length}`);

const IV_LENGTH = 16;
const predefinedTags = ['Work', 'Personal'];

const passwordSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    service: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 50,
    },
    tags: [{
      type: String,
      trim: true,
      maxlength: 20,
      validate: {
        validator: function (value) {
          return predefinedTags.includes(value) || validator.isAlphanumeric(value.replace(/\s/g, ''));
        },
        message: props => `${props.value} is not a valid tag`
      }
    }],
    username: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 30,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 8,
      maxlength: 500
    },
    iv: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      trim: true,
      maxlength: 200,
    },
    sharedWith: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }],
    lastCopied: {
      type: Date
    }
  },
  {
    timestamps: true,
    comments: {
      type: String,
      maxlength: 500,
      trim: true,
    },
  }
);

passwordSchema.pre("save", function (next) {
  if (!this.isModified("password")) return next();

  try {
    if (ENCRYPTION_KEY.length !== 32) {
      throw new Error('Invalid key length');
    }
    const iv = crypto.randomBytes(IV_LENGTH);
    logger.info(`IV generated: ${iv.toString('hex')}`);
    const cipher = crypto.createCipheriv('aes-256-cbc', ENCRYPTION_KEY, iv);
    let encrypted = cipher.update(this.password, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    this.password = encrypted;
    this.iv = iv.toString('hex');

    next();
  } catch (error) {
    logger.error('Encryption error:', error);
    next(error);
  }
});

passwordSchema.methods.decryptPassword = function () {
  try {
    const iv = Buffer.from(this.iv, 'hex');
    const decipher = crypto.createDecipheriv('aes-256-cbc', ENCRYPTION_KEY, iv);
    let decrypted = decipher.update(this.password, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  } catch (error) {
    logger.error('Decryption error:', error);
    throw error;
  }
};

const Password = mongoose.model("Password", passwordSchema);

module.exports = Password;


