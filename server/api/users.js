const { Merchants, Users, Products, Reviews, Subs, Admins } = require('../db.js');
const { Router } = require('express');
const users = Router();

users.get('/test', (req, res) => {
  res.send('yes, it works');
});

//get all users
users.get('/', (req, res) => {
  Users.findAll({
    where: {}
  })
    .then(data => res.send(data))
    .catch(err => res.send(err));
});

module.exports = users;