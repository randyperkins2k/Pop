const { Merchants, Users, Products, Reviews, Subs, Admins } = require('../db.js');
const { Router } = require('express');
const admins = Router();

admins.get('/test', (req, res) => {
  res.send('yes, admins works');
});

admins.get('/', (req, res) => {
  Admins.findAll({
    where: {}
  })
    .then(data => res.send(data))
    .catch(err => res.send(err));
});

admins.post('/addadmin/:user/:merchant', (req, res) => {
  const { user, merchant } = req.params;
  Admins.findAll({
    where: {UserId: user, MerchantId: merchant}
  })
    .then(results => {
      if (!results.length) {
        Admins.create({ UserId: user, MerchantId: merchant })
          .then(Admins.findAll({
            where: {}
          })).then(data => res.send(data))
      } else {
        res.send(`${user} is already administrating ${merchant}`);
      }
    })
    .catch(err => res.send(err));
});

//delete admin
admins.delete('/deleteadmin/:id', (req, res) => {
  const { id } = req.params;
  Admins.destroy({
    where: {id: id}
  })
    .then(res.send(`admin ${id} deleted`));
});

//delete all admins
admins.delete('/deletealladmins', (req, res) => {
  Admins.destroy({
    where: {}
  })
    .then(res.send('no more admins'))
    .catch(err => res.send(err));
});

//add admin by email
admins.post('/addbyemail', (req, res) => {
  const { email, merchant } = req.body;
  Users.findOne({
    where: {email: email}
  })
  .then(userData => {
    Admins.create({ UserId: userData.id, MerchantId: merchant })
      .then(moon => console.log(moon))
      .catch(err => res.send(err));
    res.send(userData);
  })
  .catch(err => res.send(err));
});

admins.delete('/deletebyemail/:email/:merchant', (req, res) => {
  const { email, merchant } = req.params;
  Users.findOne({
    where: {email: email}
  })
  .then(userData => {
    Admins.destroy({where: { UserId: userData.id, MerchantId: merchant }})
      .then(moon => console.log(moon))
      .catch(err => res.send(err));
    res.send(userData);
  })
  .catch(err => res.send(err));
});

module.exports = admins;