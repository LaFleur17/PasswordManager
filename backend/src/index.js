const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');

const app = express();
<<<<<<< HEAD
const PORT = process.env.PORT || 3000;
=======
const PORT = process.env.PORT || 3001;
>>>>>>> 2f0c7b455d88a8c9301ed406a11aa601648f09f5

connectDB();

app.use(express.json());

app.use('/auth', authRoutes);

app.use('/user', userRoutes);

<<<<<<< HEAD
=======
app.get('/', (req, res) => {
  res.send('hellowrld')
})

// Lancer le serveur
>>>>>>> 2f0c7b455d88a8c9301ed406a11aa601648f09f5
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
