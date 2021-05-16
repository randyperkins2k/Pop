const { Merchants, Users, Products, Reviews, Subs, Admins } = require('../db.js');
const { Router } = require('express');
const merchants = Router();
const axios = require('axios');
require('dotenv').config();
const ORS_KEY = process.env.ORS_KEY;
//get all merchants
merchants.get('/', (req, res) => {
  Merchants.findAll({
    where: {},
    include: {
      model: Reviews,
      include: [Users]
    }
  })
    .then(data => res.send(data))
    .catch(err => res.send(err));
});

//get merchant by id
merchants.get('/id/:id', (req, res) => {
  const { id } = req.params;
  Merchants.findAll({
    where: {id: id}
  })
    .then(data => res.send(data))
    .catch(err => res.send(err));
});

//add new merchant
merchants.post('/add', (req, res) => {
  const { name, category, info, website, adminId, lat, lon, isOpen } = req.body;
  Merchants.findAll({
    where: {name: name}
  })
    .then(results => {
      if (!results.length) {
        //const isOpen = true;
        Merchants.create({ name, category, info, website, lat, lon, isOpen, picture: 'https://res.cloudinary.com/opsparkpopup/image/upload/v1620963667/pop_up/a47042f201eca7299adbbf8a197f6220_gx4njo.png' })
          .then(newPopup => {
            Admins.create({UserId: adminId, MerchantId: newPopup.id})
            res.send(newPopup)
          })
      } else {
        res.send(`${name} is already a pop-up`);
      }
    })
    .catch(err => res.send(err));
});

//delete merchant
merchants.delete('/delete/:id', (req, res) => {
  const { id } = req.params;
  Merchants.destroy({
    where: {id: id}
  })
    .then(res.send(`merchant ${id} deleted`));
});

merchants.put('/closemerchant/:id/', (req, res) => {
  const { id } = req.params;
  Merchants.update(
    {isOpen: false},
    {where: {id: id}}
  )
  .then(() => res.send('closed'))
  .catch(err => res.send(err));
});
//open merchant
merchants.put('/openmerchant/:id/', (req, res) => {
  const { id } = req.params;
  Merchants.update(
    {isOpen: true},
    {where: {id: id}}
  )
  .then(() => res.send('open'))
  .catch(err => res.send(err));
});
//update merchant location
merchants.put('/merchcoords/:merchid', (req, res) => {
  const { merchid } = req.params;
  //const { lat, lng } = req.body;
  axios.get(`https://api.openrouteservice.org/geocode/reverse?api_key=${ORS_KEY}&point.lon=${req.body.lng}&point.lat=${req.body.lat}`)
  //axios.get('https://api.openrouteservice.org/geocode/reverse?api_key=5b3ce3597851110001cf62486d14495d6cf148e79f25f9021b06faa4&point.lon=-90.04322316456718&point.lat=29.976709490506295')
    .then(data => {
      //res.send(data.data.features[0].properties.name);
      //res.send('hi mom');
      let setAddress;
      if (data.data.features[0].properties.housenumber && data.data.features[0].properties.street) {
        setAddress = data.data.features[0].properties.housenumber + ' ' + data.data.features[0].properties.street;
      } else if (data.data.features[0].properties.name) {
        setAddress = data.data.features[0].properties.name;
      } else {
        setAddress = 'No Address';
      }
      Merchants.update(
        {lat: req.body.lat,
         lon: req.body.lng,
         address: setAddress
        },
         {where: {
           id: merchid
         }}
         )
        .then(() => {
          Merchants.findOne({
            where: { id: req.params.merchid }
          })
        .then(result => res.send(result));
        })
    })
    .catch((err) => {
      res.sendStatus(500)
      console.log('merchant coordinate error', err)
    })
});
//update merchant info
merchants.put('/updateinfo', (req, res) => {
  const {id, info} = req.body;
  Merchants.update(
    {info: info},
    {where: {
      id: id
    }}
  )
  .then(data => res.send(data))
  .catch(err => res.send(err));
});
//get admins by merchant id
merchants.get('/admins/:id', (req, res) => {
  const { id } = req.params;
  Merchants.findOne({
    where: {id: id},
    include: {
      model: Admins,
      include: Users
    }
  })
    .then(data => res.send(data.Admins.map(Admin => Admin.User)))
    .catch(err => res.send(err));
});

//get merchants with in given radius of centralized location
merchants.get('/radius/:km/:lat/:lon/', (req, res) => {
  const {km, lat, lon} = req.params;
  Merchants.findAll({
    where: {}
  })
    .then(data => {
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
      let filteredMerchants = data.filter(merchant => {
        return getDistanceFromLatLonInKm(lat, lon, merchant.lat, merchant.lon) <= km;
      });
      res.send(filteredMerchants);
    })
    .catch(err => res.send(err));
});

module.exports = merchants;