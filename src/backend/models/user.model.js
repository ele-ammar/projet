const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

// Définition du modèle utilisateur
const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'auth',
  timestamps: true, // Ajoute createdAt et updatedAt
});

module.exports = User;
