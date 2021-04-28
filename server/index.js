const express = require('express');
const path = require('path');
const axios = require('axios');

const { Merchants } = require('./db.js');

const app = express();
const PORT = 8080;
const CLIENT_PATH = path.resolve(__dirname, '../client/dist');
app.use(express.static(CLIENT_PATH));

/**
 * start authentication routes
 */

const passport = require('passport');
require('./passport-setup');
app.use(express.json());
const cookieSession = require('cookie-session');

app.use(cookieSession({
  name: 'tuto-session',
  keys: ['key1', 'key2']
}));

app.use(passport.initialize());
app.use(passport.session());

app.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/google/callback', passport.authenticate('google', { failureRedirect: '/failed' }),
  function(req, res) {
    // Successful authentication, redirect home.
    console.log('hello from google callback');
    console.log(req.user.displayName);
    console.log(req.user.emails[0].value);
    //console.log(req.user.photos[0].value);
    res.redirect('/');
  }
);
// Logout route
app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

//check to see if user is logged in
app.get('/testing', (req, res)=>{
  if (req.user) {
    res.send(req.user);
  } else {
    res.send('not logged in');
  }
});

//login failed
app.get('/failed', (req, res) => {
  req.logout();
  res.redirect('/');
});

/**
 * end authentication routes
 */

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
