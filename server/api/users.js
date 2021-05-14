const { Merchants, Users, Products, Reviews, Subs, Admins } = require('../db.js');
const { Router } = require('express');
const users = Router();

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

//switch to dark mode
users.put('/dark', (req, res) => {
  const { id } = req.body;
  Users.update(
    {dark: true},
    {where: {id: id}}
  )
  .then(result => res.send(result))
  .catch(err => res.send(err));
});

//switch to light mode
users.put('/light', (req, res) => {
  const { id } = req.body;
  Users.update(
    {dark: false},
    {where: {id: id}}
  )
  .then(result => res.send(result))
  .catch(err => res.send(err));
});

//switch to spanish
users.put('/spanish', (req, res) => {
  const { id } = req.body;
  Users.update(
    {spanish: true},
    {where: {id: id}}
  )
  .then(result => res.send(result))
  .catch(err => res.send(err));
});

//switch to english
users.put('/english', (req, res) => {
  const { id } = req.body;
  Users.update(
    {spanish: false},
    {where: {id: id}}
  )
  .then(result => res.send(result))
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


module.exports = users;