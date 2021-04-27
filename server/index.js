const express = require('express');
const path = require('path');
const axios = require('axios');

const app = express();
const PORT = 8080;
const CLIENT_PATH = path.resolve(__dirname, '../client/dist');
app.use(express.static(CLIENT_PATH));
//end point time

app.post('/addmerchant', (req, res) => {
  res.send('success');
});

app.listen(PORT, (() => {
  console.log(`Server listening at http://127.0.0.1:${PORT}`);
}));
