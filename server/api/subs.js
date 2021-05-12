const { Merchants, Users, Products, Reviews, Subs, Admins } = require('../db.js');
const { Router } = require('express');
const subs = Router();

subs.get('/test', (req, res) => {
  res.send('yes, subs works');
});

//get all subs
subs.get('/', (req, res) => {
  Subs.findAll({
    where: {}
  })
    .then(data => res.send(data))
    .catch(err => res.send(err));
});

//get all users subs
subs.get('/user/:user', (req, res) => {
  Subs.findAll({
    where: {UserId: req.params.user}
  })
    .then(data => res.send(data))
    .catch(err => res.send(err));
});

//add new sub
subs.post('/addsub', (req, res) => {
  const { userid, merchantid } = req.body;
  Subs.findAll({
    where: { userid, merchantid }
  })
    .then(results => {
      console.log(results)
      if (!results.length) {
        Subs.create({ UserId: userid, MerchantId: merchantid })
          .then( () => {Users.findOne({
            where: {id: userid},
            include: {
              model: Subs,
              include: Merchants
            }
          }).then(data => {
            console.log('this is the data', data);
            res.send(data);
          })
          })
      } else {
        res.send(`${user} is already following ${merchant}`);
      }
    })
    .catch(err => res.send(err));
});

//delete sub
subs.delete('/deletesub/:userId/:merchantId', (req, res) => {
  const { userId, merchantId } = req.params;
  Subs.destroy({
    where: {userId, merchantId}
  })
    .then(res.send(`deleted`));
});

//delete subs
subs.delete('/deleteallsubs', (req, res) => {
  Subs.destroy({
    where: {}
  })
    .then(res.send('no more subs'))
    .catch(err => res.send(err));
});

module.exports = subs;