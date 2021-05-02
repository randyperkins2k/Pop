const mysql = require('mysql2/promise');

const { Merchants, Users, Products, Reviews, Subs, Admins,  db } = require('./db.js');
console.log('starting...');
const seedMysql = () => {
  mysql
    .createConnection({ user: 'root', password: ''})
    .then((db) =>
      db.query('CREATE DATABASE IF NOT EXISTS `pop`').then(() => db)
    )
    .then(() =>
      console.log(
        "\nDatabase (MySQL): 'pop' succesfully created!"
      )
    )
    .then(() => Admins.sync({ force: true }))
    .then(() =>
      console.log(
        "\nDatabase (MySQL): 'Admins' table succesfully created!"
      )
    )
    .then(() =>
      Promise.all([
        {UserId: 1, MerchantId: 1},
        {UserId: 2, MerchantId: 2},
      ].map((admin) => Admins.create(admin))
    )
  )
    .then(process.exit);
};
seedMysql();