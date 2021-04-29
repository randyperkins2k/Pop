const express = require('express');
const path = require('path');
const axios = require('axios');

const { Merchants } = require('./db.js');
const { Subscriptions } = require('./db.js');

const app = express();
const PORT = 8080;
const CLIENT_PATH = path.resolve(__dirname, '../client/dist');
app.use(express.static(CLIENT_PATH));


/**
 * Idea: It would be cool if you couldn't add another pop up until you finished all the info on your current one
 **/



//add catch statements
app.post('/addmerchant/:name/:lat/:lon', (req, res) => {
  const { name, lat, lon } = req.params;
  Merchants.create({name, lat, lon})
    .then(Merchants.findAll({
      where: {}
    })).then(data => res.send(data))
});

//add catch statements
app.get('/merchants', (req, res) => {
  Merchants.findAll({
    where: {}
  })
    .then(data => res.send(data));
});

app.listen(PORT, (() => {
  console.log(`Server listening at http://127.0.0.1:${PORT}`);
}));
