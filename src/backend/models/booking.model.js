const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

// Define the Booking model
const Booking = sequelize.define('Booking', {
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
  },
  datetime: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  destination: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: true, // Optional field
  },
}, {
  tableName: 'bookings', // Table name in the database
  timestamps: true, // Adds createdAt and updatedAt fields
});

module.exports = Booking;