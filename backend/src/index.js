const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/database');
const authRoutes = require('./routes/authRoutes');
const passwordRoutes = require('./routes/passwordRoutes');

dotenv.config();

// Initialiser l'application Express
const app = express();
const PORT = process.env.PORT || 3001;

// Connexion à la base de données MongoDB
connectDB();

// Middleware pour le parsing du corps des requêtes JSON
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/passwords', passwordRoutes);

// Middleware pour la gestion des erreurs
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

app.get('/', (req, res) => {
  res.send('hellowrld')
})

// Lancer le serveur
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

