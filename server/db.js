const { Sequelize, DataTypes } = require('sequelize');


const sequelize = new Sequelize({
  host: 'localhost',
  dialect: 'mysql',
  username: 'root',
  password: '',
  database: 'pop',
  logging: false,
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
  info: DataTypes.STRING,
  lat: DataTypes.DECIMAL(20, 15),
  lon: DataTypes.DECIMAL(20, 15),
  category: DataTypes.STRING,
  website: DataTypes.STRING,
  phone: DataTypes.STRING,
  rating: DataTypes.INTEGER,
  isOpen: DataTypes.BOOLEAN,
  lastOpen: DataTypes.STRING,
});
//stupid stupid comment
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
  merchant: DataTypes.INTEGER, //reference to Merchants.id
  price: DataTypes.DECIMAL(7, 2), //maybe change to string
  status: DataTypes.STRING,
});

//join tables
Products.sync();

const Reviews = sequelize.define('Reviews', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    unique: true,
  },
  UserId: {
    type: DataTypes.INTEGER,
    references: {
      model: Users,
      key: Users.id,
    }
  },
  MerchantId: {
    type: DataTypes.INTEGER,
    references: {
      model: Merchants,
      key: Merchants.id,
    }
  },
  rating: DataTypes.INTEGER,
  message: DataTypes.STRING,
});

Users.hasMany(Reviews);
Reviews.belongsTo(Users);
Merchants.hasMany(Reviews);
Reviews.belongsTo(Merchants);

const Subs = sequelize.define('Subs', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    unique: true,
  },
  UserId: {
    type: DataTypes.INTEGER,
    references: {
      model: Users,
      key: Users.id,
    },
    allowNull: false
  },
  MerchantId: {
    type: DataTypes.INTEGER,
    references: {
      model: Merchants,
      key: Merchants.id,
    },
    allowNull: false
  }
});
//Merchants.belongsToMany(Users, { through: Subs });
//Users.belongsToMany(Merchants, { through: Subs });

Users.hasMany(Subs);
Subs.belongsTo(Users);
Merchants.hasMany(Subs);
Subs.belongsTo(Merchants);

const Admins = sequelize.define('Admins', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    unique: true,
  },
  UserId: {
    type: DataTypes.INTEGER,
    references: {
      model: Users,
      key: Users.id,
    }
  },
  MerchantId: {
    type: DataTypes.INTEGER,
    references: {
      model: Merchants,
      key: Merchants.id,
    }
  },
});

Users.hasMany(Admins);
Admins.belongsTo(Users);
Merchants.hasMany(Admins);
Admins.belongsTo(Merchants);

const Pictures = sequelize.define('Picture', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    unique: true,
  },
  MerchantId: {
    type: DataTypes.INTEGER,
    references: {
      model: Merchants,
      key: Merchants.id,
    }
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

Pictures.sync();
Merchants.hasMany(Pictures);

module.exports = {
  db: sequelize,
  Users,
  Merchants,
  Products,
  Reviews,
  Subs,
  Admins,
  Pictures
};
