const express = require('express');
const path = require('path');
const axios = require('axios');

const users = require('./api/users.js');
const merchants = require('./api/merchants.js');
const products = require('./api/products.js');
const reviews = require('./api/reviews.js');
const subs = require('./api/subs.js');
const admins = require('./api/admins.js');

const Dotenv = require('dotenv-webpack');

const { Merchants, Users, Products, Reviews, Subs, Admins } = require('./db.js');

const app = express();
const PORT = 8080;

const CLIENT_PATH = path.resolve(__dirname, '../client/dist');
const ASSETS_PATH = path.resolve(__dirname, 'assets');
app.use(express.json({limit: '50mb'}));
app.use(express.static(CLIENT_PATH));
app.use('/assets', express.static(ASSETS_PATH));
app.use('/api/users', users);
app.use('/api/merchants', merchants);
app.use('/api/products', products);
app.use('/api/reviews', reviews);
app.use('/api/subs', subs);
app.use('/api/admins', admins);


/*Cloudinary

routes
*/
const { images } = require('./cloudinary.js');
app.use('/api/images', images);
//cloudinary routes end

/**
 * start authentication routes
 */

const passport = require('passport');
require('./passport-setup');
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
  console.log('hello from logout');
  res.redirect('/');
});

app.get('/login', (req, res) => {
  res.send('<a href="/google"> Login </a>');
})

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

//end authentication routes

//get crow's flight distance between two points
app.get('api/distance/:lat1/:lon1/:lat2/:lon2', (req, res) => {
  const {lat1, lon1, lat2, lon2} = req.params;

  function deg2rad(deg) {
    return deg * (Math.PI/180)
  }

  function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2-lat1);  // deg2rad below
    var dLon = deg2rad(lon2-lon1);
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon/2) * Math.sin(dLon/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c; // Distance in km
    return d;
  }
  console.log(getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2));
  let result = getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2);
  res.json(result);
});

app.listen(PORT, (() => {
  console.log(`Server listening at http://127.0.0.1:${PORT}`);
}));
