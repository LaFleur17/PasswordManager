const express = require("express");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const passwordRoutes = require("./routes/password");
const passwordCollaborationRoutes = require("./routes/passwordCollaboration");
const libraryRoutes = require("./routes/library");
const dotenv = require("dotenv");
const cors = require("cors");
const limiter = require("./utils/expressratelimit");

dotenv.config();

const app = express();
const PORT = process.env.PORT;
const IP = process.env.IP;

const corsOptions = {
  origin: `http://${IP}`,
  methods: ["GET", "POST", "DELETE", "PUT"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

connectDB();

app.use(cors(corsOptions));

app.use(express.json());

app.use(limiter);

app.use("/auth", authRoutes);

app.use("/user", userRoutes);

app.use("/password", passwordRoutes);

app.use("/password-collaboration", passwordCollaborationRoutes);

app.use("/libraries", libraryRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

app.get("/", (req, res) => {
  res.send("hello wodwrdwdewld2")
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
