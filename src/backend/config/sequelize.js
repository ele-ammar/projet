const { Sequelize } = require('sequelize');

// Configuration de Sequelize
const sequelize = new Sequelize("crud", "postgres", "123456789", {
    host: "localhost",
    dialect: "postgres",
    //
    
 });

// Test de connexion
sequelize.authenticate()
  .then(() => console.log('Connection to PostgreSQL successful!'))
  .catch(err => console.error('Unable to connect to PostgreSQL:', err));

module.exports = sequelize;
