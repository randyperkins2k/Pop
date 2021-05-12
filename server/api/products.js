const { Merchants, Users, Products, Reviews, Subs, Admins } = require('../db.js');
const { Router } = require('express');
const products = Router();


//get all products associated with merchant
products.get('/menu/:merchant', (req, res) => {
  const { merchant } = req.params;
  Products.findAll({
    where: {merchant: merchant}
  })
    .then(data => res.send(data))
    .catch(err => res.send(err));
});
//add new product
products.post('/addproduct', (req, res) => {
  const { name, merchant, price } = req.body;
  Products.create({ name, merchant, price })
    .then(data => res.send(data))
    .catch(err => res.send(err));
});
//change price of product
products.put('/changeprice/:id/:price', (req, res) => {
  const { id, price } = req.params;
  Products.update(
    {price: price},
    {returning: true, where: {id: id}}
  )
  .then(() => res.send('price updated'))
  .catch(err => res.send(err));
});
//change status of product
products.put('/changestatus/:id/:status', (req, res) => {
  const { id, status } = req.params;
  Products.update(
    {status: status},
    {returning: true, where: {id: id}}
  )
  .then(() => res.send('status updated'))
  .catch(err => res.send(err));
});
//delete product
products.delete('/deleteproduct/:id', (req, res) => {
  const { id } = req.params;
  Products.destroy({
    where: {id: id}
  })
    .then(res.send(`product ${id} deleted`));
});

module.exports = products;