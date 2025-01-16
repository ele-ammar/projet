const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const hotelcity = sequelize.define('hotelcity', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  
  titre_ville: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description_ville: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  titre_hotel: {
    type: DataTypes.STRING,
    allowNull: true,
  
  },
  hotels: {
    type: DataTypes.ARRAY(DataTypes.INTEGER),
    allowNull: false,
  },

  questions: {
    type: DataTypes.STRING,
    allowNull: true,
  },

},

{
  tableName: 'hotelcity', // Table name in the database
  timestamps: true, // Adds createdAt and updatedAt fields
}
);

module.exports = hotelcity;
