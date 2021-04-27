const express = require('express');
const path = require('path');
const app = express();
const PORT = 8080;
const CLIENT_PATH = path.resolve(__dirname, '../client/dist');
app.use(express.static(CLIENT_PATH));
app.listen(PORT, (() => {
  console.log(`Server listening at http://127.0.0.1:${PORT}`);
}));

//end point time