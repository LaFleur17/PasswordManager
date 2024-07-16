const mongoose = require('mongoose');

const librarySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  collaborators: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    permission: {
      type: String,
      enum: ['read', 'write'],
      default: 'read',
    },
  }],
  passwords: [{
    password: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Password',
    },
    addedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    addedAt: {
      type: Date,
      default: Date.now,
    },
  }],
});

const Library = mongoose.model('Library', librarySchema);

module.exports = Library;

