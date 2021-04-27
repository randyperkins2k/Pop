const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize({
  host: 'localhost',
  dialect: 'mysql',
  username: 'root',
  password: '',
  database: 'pop',
});

const Merchants = sequelize.define('Merchants', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    unique: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  picture: DataTypes.STRING,
  about: DataTypes.STRING,
  lat: DataTypes.DECIMAL(8, 4),
  lon: DataTypes.DECIMAL(8, 4),
  admin_id: DataTypes.INTEGER,
  category: DataTypes.STRING,
  website: DataTypes.STRING,
  phone: DataTypes.STRING,
  isOpen: DataTypes.BOOLEAN,
  lastOpen: DataTypes.DATE,
});

module.exports = {
  db: sequelize,
  Merchants,
};
