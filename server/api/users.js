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

//get user by email
users.get('/email/:email', (req, res) => {
  const { email } = req.params;
  Users.findOne({
    where: {email: email}
  })
    .then(data => res.send(data))
    .catch(err => res.send(err));
});

//get user by id, includes admins and merchants join tables
users.get('/id/:id', (req, res) => {
  const { id } = req.params;
  Users.findOne({
    where: {id: id},
    include:
    [{
      model: Admins,
      include: Merchants,
    },
    {model: Subs,
    include: {
      model: Merchants,
      include: {
        model: Reviews,
        include: Users
    }
   }
  }
  ]})
    .then(data => res.send(data))
    .catch(err => res.send(err));
});

users.post('/adduser/:name/:email/', (req, res) => {
  const { name, email } = req.params;
  Users.findAll({
    where: {email: email},
    include:
    [{
      model: Admins,
      include: Merchants,
    },
    {model: Subs,
      include: {
        model: Merchants,
        include: {
          model: Reviews,
          include: Users
      }
     }
    }
  ]})
  .then(results => {
    if (!results.length) {
      Users.create({ name, email })
        .then(data => res.send(data))
    }
    else {
      res.send(results[0]);
    }
  })
    .catch(err => res.send(err));
});

//delete user
users.delete('/deleteuser/:id', (req, res) => {
  const { id } = req.params;
  Users.destroy({
    where: {id: id}
  })
    .then(res.send(`user ${id} deleted`));
});

//delete all users
users.delete('/deleteallusers', (req, res) => {
  Users.destroy({
    where: {}
  })
    .then(res.send('no more users'))
    .catch(err => res.send(err));
});

module.exports = users;