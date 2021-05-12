const { Merchants, Users, Products, Reviews, Subs, Admins } = require('../db.js');
const { Router } = require('express');
const subs = Router();

subs.get('/test', (req, res) => {
  res.send('yes, subs works');
});


module.exports = subs;