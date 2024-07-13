const express = require("express");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const passwordRoutes = require("./routes/password");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const corsOptions = {
  origin: "http://localhost:3001",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

connectDB();

app.use(cors(corsOptions));

app.use(express.json());

app.use("/auth", authRoutes);

app.use("/user", userRoutes);

app.use("/password", passwordRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
