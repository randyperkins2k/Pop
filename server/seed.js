const mysql = require('mysql2/promise');

const { Merchants, Users, Products, Reviews, Subs, Admins,  db } = require('./db.js');

db.options.logging = false;
console.log('getting started...');
const seedMysql = () => {
  mysql
    .createConnection({ user: 'root', password: ''})
    .then((db) =>
      db.query('CREATE DATABASE IF NOT EXISTS `pop`').then(() => db)
    )
    .then(() =>
      console.log(
        '\x1b]33m',
        "\nDatabase (MySQL): 'pop' succesfully created!"
      )
    )
    .then(() => Merchants.sync({ force: true }))
    .then(() =>
      console.log(
        "\nDatabase (MySQL): 'Merchants' table succesfully created!"
      )
    )
    .then(() =>
      Promise.all([
        {name:'Tight Taco Truck'},
        {name: 'Lit Art Stand'},
      ].map((pop) => Merchants.create(pop))
    )
  )
  .then(() => Users.sync({ force: true }))
    .then(() =>
      console.log(
        "\nDatabase (MySQL): 'Users' table succesfully created!"
      )
    )
    .then(() =>
      Promise.all([
        {name:'Big Steve'},
        {name: 'Little Steve'},
      ].map((user) => Users.create(user))
    )
  )
  .then(() => Reviews.sync({ force: true }))
    .then(() =>
      console.log(
        "\nDatabase (MySQL): 'Reviews' table succesfully created!"
      )
    )
    .then(() =>
      Promise.all([
        {user: 2, merchant: 1, rating: 5, message: 'tightest tacos'},
        {user: 1, merchant: 2, rating: 5, message: 'great paintings'},
      ].map((rev) => Reviews.create(rev))
    )
  )
  .then((arr) =>
    console.log(
      '\x1b[32m',
      `\nDatabase (MySQL): Succesfully seeded pop!\n`,
      '\x1b[37m'
    )
  )
  .then(process.exit);
};

seedMysql();
