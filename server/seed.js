const mysql = require('mysql2/promise');

const { Merchants, db } = require('./db.js');

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
        {name:'Tight Taco Truck', lat: 0, lon: 0},
        {name: 'Lit Art Stand', lat: 0, lon: 0},
      ].map((pop) => Merchants.create(pop))
    )
  )
  .then((arr) =>
    console.log(
      '\x1b[32m',
      `\nDatabase (MySQL): Succesfully seeded pop with ${arr.length} entires!\n`,
      '\x1b[37m'
    )
  )
  .then(process.exit);
};

seedMysql();
