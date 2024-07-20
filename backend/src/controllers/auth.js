const jwt = require("jsonwebtoken");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { validatePassword } = require("../utils/passwordValidator");

const register = async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    // Vérifier la complexité du mot de passe
    const passwordError = validatePassword(password);
    if (passwordError) {
      return res.status(400).json({ message: passwordError });
    }

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ message: "Username or email already exists" });
    }

    // Hacher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Créer un nouvel utilisateur avec le mot de passe haché
    const newUser = new User({ username, email, password});
    await newUser.save();

    res.json({ message: "Registration successful" });
  } catch (error) {
    next(error);
  }
};
const login = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    // Recherchez l'utilisateur par nom d'utilisateur
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User or password invalid" });
    }

    const passwordMatch = await user.comparePassword(password);
    if (!passwordMatch) {
      console.log("Incorrect password for user:", username);
      return res.status(401).json({ message: "User or password invalid" });
    }

    // Générez un token JWT pour l'utilisateur
    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });
    console.log("User logged in successfully:", username);
    res.json({ token });
  } catch (error) {
    console.error("Error during login:", error.message);
    next(error);
  }
};

module.exports = { register, login };
