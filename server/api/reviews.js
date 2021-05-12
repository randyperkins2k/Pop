const { Merchants, Users, Products, Reviews, Subs, Admins } = require('../db.js');
const { Router } = require('express');
const reviews = Router();


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



module.exports = reviews;