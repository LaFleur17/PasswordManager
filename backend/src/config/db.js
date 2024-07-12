// backend/src/config/database.js
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("Connection to MongoDB failed:", error.message);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
