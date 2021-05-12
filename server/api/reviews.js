const { Merchants, Users, Products, Reviews, Subs, Admins } = require('../db.js');
const { Router } = require('express');
const reviews = Router();

reviews.get('/test', (req, res) => {
  res.send('yes, reviews works');
});

//get all reviews
reviews.get('/', (req, res) => {
  Reviews.findAll({
    where: {}
  })
    .then(data => res.send(data))
    .catch(err => res.send(err));
});

//add new review
reviews.post('/addreview', (req, res) => {
  const { UserId, MerchantId, rating, message } = req.body;
  Reviews.create({ UserId, MerchantId, rating, message })
    .then(data => res.send(data))
    .catch(err => res.send(err));
});

//delete review
reviews.delete('/deletereview/:id', (req, res) => {
  const { id } = req.params;
  Reviews.destroy({
    where: {id: id}
  })
    .then(res.send(`review ${id} deleted`));
});

//delete all reviews
reviews.delete('/deleteallreviews', (req, res) => {
  Reviews.destroy({
    where: {}
  })
    .then(res.send('no more reviews'))
    .catch(err => res.send(err));
});

module.exports = reviews;