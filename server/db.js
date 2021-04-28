const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize({
  host: 'localhost',
  dialect: 'mysql',
  username: 'root',
  password: '',
  database: 'pop',
});

const Users = sequelize.define('Users', {
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
  cloudinary_id: DataTypes.STRING,
  email: DataTypes.STRING,
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
  cloudinary_id: DataTypes.STRING,
  about: DataTypes.STRING,
  lat: DataTypes.DECIMAL(8, 4),
  lon: DataTypes.DECIMAL(8, 4),
  admin: DataTypes.INTEGER, //reference to Admins.id
  category: DataTypes.STRING,
  website: DataTypes.STRING,
  phone: DataTypes.STRING,
  rating: DataTypes.INTEGER,
  isOpen: DataTypes.BOOLEAN,
  lastOpen: DataTypes.DATE,
});

const Products = sequelize.define('Products', {
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
  merchant_Id: DataTypes.INTEGER, //reference to Merchants.id
  price: DataTypes.DECIMAL(7, 5),
  status: DataTypes.STRING,
});

//join tables

const Reviews = sequelize.define('Reviews', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    unique: true,
  },
  user: DataTypes.INTEGER, //references Users.id
  popup: DataTypes.INTEGER, //references Merchants.id
  rating: DataTypes.INTEGER,
  message: DataTypes.STRING,
});

const Subs = sequelize.define('Subs', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    unique: true,
  },
  user: DataTypes.INTEGER, //references Users.id
  popup: DataTypes.INTEGER, //references Merchants.id
});

const Admins = sequelize.define('Admins', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    unique: true,
  },
  user: DataTypes.INTEGER, //references Users.id
  popup: DataTypes.INTEGER, //references Merchants.id
});

module.exports = {
  db: sequelize,
  Merchants,
};
