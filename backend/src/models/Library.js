// models/Library.js
const mongoose = require("mongoose");

const librarySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  sharedWith: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    }
  ],
  passwords: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Password',
    }
  ],
}, { timestamps: true });

const Library = mongoose.model("Library", librarySchema);

module.exports = Library;

