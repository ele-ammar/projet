const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/sequelize');
const User = require('./models/user.model');
const bcrypt = require('bcryptjs');
const Booking=require('./models/booking.model');
const hotelcity=require('./models/hotelcity.model');
const Hotel=require('./models/hotels.model');
const { QueryTypes } = require('sequelize');
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

// Route POST pour enregistrer un hôtel
app.post('/api/hotels', async (req, res) => {
  try {
    const { nom, image, classement, localisation,description, equipement, prix, btn_details } = req.body;
    const hotel = await Hotel.create({ nom, image, classement, localisation,description, equipement, prix, btn_details });
    res.status(201).json({ message: 'Hôtel enregistré avec succès', hotel });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de l\'enregistrement de l\'hôtel' });
  }
});






////// creation de tableau dans la base de donnée

app.post('/cityhotel', async (req, res) => {
  const { id, image,titre_ville, description_ville, titre_hotel,hotels,questions } = req.body;

  try {
    // Crée une nouvelle entrée dans la table hotelcity
    const city = await hotelcity.create({
      id,
      image,
      titre_ville,
      description_ville,
      titre_hotel,
      hotels,
      questions

    });

    // Retourne une réponse réussie avec l'objet créé
    res.status(201).json({ success: true, cityville: city });
  } catch (err) {
    console.error(err);

    // Retourne un message d'erreur avec un statut 500
    res.status(500).json({ success: false, message: 'Error saving cityhotel.', error: err.message });
  }
});



/*

////// insertion des donner dans le tableau


app.post('/cityhotel/add', async (req, res) => {
  const { 
    id,
    image,
    titre_ville,
    description_ville,
    titre_hotel,
    hotels,
    questions
  
  } = req.body;
  try {
    await sequelize.query(
      `INSERT INTO "hotelcity" (id,
      image,
      titre_ville,
      description_ville,
      titre_hotel,
      hotels,
      questions) VALUES ($1, $2, $3,$4,$5,$6,$7)`,
      {
        bind: [id,
          image,
          titre_ville,
          description_ville,
          titre_hotel,
          hotels,
          questions],
        type: QueryTypes.INSERT,
      }
    );
    res.status(201).json({ message: 'Créé avec succès.' });
  } catch (error) {
    console.error('Erreur lors de l\'insertion dans hotelcity :', error);
    res.status(500).json({ message: 'Erreur serveur lors de l\'insertion.' });
  }
});
















/*
//MISE A JOUR DES DONNEE

app.PUT('/api/cityhotel/UPDATE', async (req, res) => {
  const { id,  image, titre,description1,element,description2} = req.body;

  try {
    await sequelize.query(
      `UPDATE hotelcity SET  image=?,titre=?, description1=?,element=?,description2=? WHERE id=?;`,
      {
        bind: [id, image, titre,description1,element,description2],
        type: QueryTypes.UPDATE,
      }
    );
    res.status(201).json({ message: 'Créé avec succès.' });
  } catch (error) {
    console.error('Erreur lors de la mise a jour  dans hotelcity :', error);
    res.status(500).json({ message: 'Erreur serveur lors de la mise a jour.' });
  }
});

//////SELECTION DES DONNEE
app.post('/api/cityhotel/select', async (req, res) => {
  const { id} = req.body;

  try {
    await sequelize.query(
      `select * from "hotelcity" where id=? `,
      {
        bind: [id],
        type: QueryTypes.SELECT,
      }
    );
    res.status(201).json({ message: 'Créé avec succès.' });
  } catch (error) {
    console.error('Erreur lors de la selection dans hotelcity :', error);
    res.status(500).json({ message: 'Erreur serveur lors de la selection.' });
  }
});
*/


// Démarrage du serveur
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
