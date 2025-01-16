const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const Hotel = sequelize.define('Hotel', {
  nom: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  classement: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  localisation: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  equipement: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  prix: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  btn_details: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: true,
  tableName: 'Hotels', // Correspond au nom du tableau dans la base de données
});

module.exports = Hotel;
