const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/sequelize');
const User = require('./models/user.model');
const bcrypt = require('bcryptjs');
const Booking=require('./models/booking.model')
const app = express();
app.use(bodyParser.json());
const cors = require('cors');
app.use(cors());

// Synchronisation avec la base de données
sequelize.sync({ force: false }) // force: true recrée les tables à chaque exécution
  .then(() => {
    console.log('Tables synchronized!');
  })
  .catch(err => console.error('Error synchronizing tables:', err));

// Route pour l'inscription
app.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });
    res.status(201).json({ user });
  } catch (err) {
    console.error('Error creating user:', err);
    res.status(500).json({ message: 'Error creating user' });
  }
});

// Route pour la connexion
app.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    res.status(200).json({ message: 'Login successful', user });
  } catch (err) {
    console.error('Error signing in:', err);
    res.status(500).json({ message: 'Error signing in' });
  }
});

// Endpoint to save booking
app.post('/api/book', async (req, res) => {
  const { name, email, datetime, destination, message } = req.body;

  try {
    const newBooking = await Booking.create({ name, email, datetime, destination, message });
    res.status(201).json({ success: true, booking: newBooking });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Error saving booking.' });
  }
});



// Démarrage du serveur
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
