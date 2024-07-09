const Password = require('../models/Password');

const getPasswords = async (req, res) => {
  try {
    const passwords = await Password.find({ user: req.user._id });
    res.json(passwords);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const createPassword = async (req, res) => {
  const { website, username, password } = req.body;

  try {
    const newPassword = await Password.create({
      user: req.user._id,
      website,
      username,
      password,
    });

    res.status(201).json(newPassword);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const updatePassword = async (req, res) => {
  const { id } = req.params;
  const { website, username, password } = req.body;

  try {
    const updatedPassword = await Password.findByIdAndUpdate(
      id,
      { website, username, password },
      { new: true }
    );

    res.json(updatedPassword);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const deletePassword = async (req, res) => {
  const { id } = req.params;

  try {
    await Password.findByIdAndDelete(id);
    res.json({ message: 'Password deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getPasswords,
  createPassword,
  updatePassword,
  deletePassword,
};

