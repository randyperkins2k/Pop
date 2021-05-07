const express = require('express');
const path = require('path');
const axios = require('axios');
const Dotenv = require('dotenv-webpack');

const { Merchants, Users, Products, Reviews, Subs, Admins } = require('./db.js');

const app = express();
const PORT = 8080;
const CLIENT_PATH = path.resolve(__dirname, '../client/dist');
const ASSETS_PATH = path.resolve(__dirname, 'assets');
app.use(express.static(CLIENT_PATH));
app.use('/assets', express.static(ASSETS_PATH));

/**
 * start authentication routes
 */

const passport = require('passport');
require('./passport-setup');
app.use(express.json());
const cookieSession = require('cookie-session');

/*Cloudinary
  routes
*/
const { images } = require('./cloudinary.js');
app.use('/api/images', images);
//cloudinary routes end

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


///////////////////////////
////////////////////////////
// ///////////////////////////
// Users.belongsToMany(Merchants, { through: Subs });
// Merchants.belongsToMany(Users, { through: Subs });

// // Users.belongsToMany(Merchants, { through: 'Ownership' });
// // Merchants.belongsToMany(Users, { through: 'Ownership' });


// app.get('/api/jointest/:userid', (req, res) => {
//   Users.findOne({id: req.params.userid})
//     .then(user => {
//       user.getMerchants()
//         .then(merchs => {
//           res.status(200).send(merchs)
//         })
//         .catch(err => console.log(err))
//     })
// });

// app.post('/api/jointest', (req, res) => {
//   const { userid, merchantid } = req.body;
//   console.log('getting jointest request')
//   Users.findOne({ where: {id: userid}}).then(user=> {
//     Merchants.findOne({ where: {id: merchantid}})
//       .then((merch => {
//         user.setMerchants(merch)
//          .then(data => {
//            console.log(data)
//            res.status(201).send(data.data)
//          })
//           .catch(err => {
//             console.log(err)
//             res.status(500).send(err)
//           })
//       }))
//     .catch(err => {
//       console.log(err)
//       res.status(500).send(err)
//     });
//  });
// });

/////////////////////////////////
//////////////////////////////////
///////////////////////////////////

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

/**
 * Merchants
 */
//get all merchants
app.get('/merchants', (req, res) => {
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
app.get('/merchant/:id', (req, res) => {
  const { id } = req.params;
  Merchants.findAll({
    where: {id: id}
  })
    .then(data => res.send(data))
    .catch(err => res.send(err));
});

//get merchants in given radius
app.get('/api/merchant/radius/:miles', (req, res) => {
  Merchants.findAll({
    where: {}
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => res.send(err));
});

app.get('/distance/:lat1/:lon1/:lat2/:lon2', (req, res) => {
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

//add new merchant
app.post('/api/merchant/add', (req, res) => {
  const { name, category, info, website, adminId, lat, lon } = req.body;
  Merchants.findAll({
    where: {name: name}
  })
    .then(results => {
      if (!results.length) {
        const isOpen = true;
        Merchants.create({ name, category, info, website, lat, lon, isOpen })
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
app.delete('/api/merchant/delete/:id', (req, res) => {
  const { id } = req.params;
  Merchants.destroy({
    where: {id: id}
  })
    .then(res.send(`merchant ${id} deleted`));
});
//delete all merchants
app.delete('/deleteallmerchants', (req, res) => {
  Merchants.destroy({
    where: {}
  })
    .then(res.send('no more merchants'))
    .catch(err => res.send(err));
});

//close merchant
app.put('/closemerchant/:id/', (req, res) => {
  const { id } = req.params;
  Merchants.update(
    {isOpen: false},
    {where: {id: id}}
  )
  .then(() => res.send('closed'))
  .catch(err => res.send(err));
});

//open merchant
app.put('/openmerchant/:id/', (req, res) => {
  const { id } = req.params;
  Merchants.update(
    {isOpen: true},
    {where: {id: id}}
  )
  .then(() => res.send('open'))
  .catch(err => res.send(err));
});

app.put('/api/merchcoords/:merchid', (req, res) => {
  const { merchid } = req.params;
  const { lat, lng } = req.body;
  Merchants.update(
    {lat: lat,
     lon: lng},
     {where: {
       id: merchid
     }}
     )
    .then(() => res.sendStatus(201))
    .catch((err) => {
      res.sendStatus(500)
      console.log('merchant coordinate error', err)
    })
})

app.put('/api/merchant/updateinfo', (req, res) => {
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

app.get('/merchant/admins/:id', (req, res) => {
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
/**
 * Users
 */
//get all users
app.get('/users', (req, res) => {
  Users.findAll({
    where: {}
  })
    .then(data => res.send(data))
    .catch(err => res.send(err));
});

//get user by email
app.get('/user/:email', (req, res) => {
  const { email } = req.params;
  Users.findOne({
    where: {email: email}
  })
    .then(data => res.send(data))
    .catch(err => res.send(err));
});

//get user by id
app.get('/userid/:id', (req, res) => {
  const { id } = req.params;
  Users.findOne({
    where: {id: id},
    include:
    [{
      model: Admins,
      include: Merchants,
    },
    {model: Subs,
    include: {
      model: Merchants,
      include: {
        model: Reviews,
        include: Users
    }
   }
  }
  ]})
    .then(data => res.send(data))
    .catch(err => res.send(err));
});

//troubleshooting measure
//add new user
app.post('/adduser/:name/:email/', (req, res) => {
  const { name, email } = req.params;
  Users.findAll({
    where: {email: email},
    include:
    [{
      model: Admins,
      include: Merchants,
    },
    {model: Subs,
      include: {
        model: Merchants,
        include: {
          model: Reviews,
          include: Users
      }
     }
    }
  ]})
  .then(results => {
    if (!results.length) {
      Users.create({ name, email })
        .then(data => res.send(data))
    }
    else {
      res.send(results[0]);
    }
  })
    .catch(err => res.send(err));
});
//delete user
app.delete('/deleteuser/:id', (req, res) => {
  const { id } = req.params;
  Users.destroy({
    where: {id: id}
  })
    .then(res.send(`user ${id} deleted`));
});
//delete all users
app.delete('/deleteallusers', (req, res) => {
  Users.destroy({
    where: {}
  })
    .then(res.send('no more users'))
    .catch(err => res.send(err));
});
/**
 * Products
 */
//get all products
app.get('/api/products', (req, res) => {
  Products.findAll({
    where: {}
  })
    .then(data => res.send(data))
    .catch(err => res.send(err));
});
//get all products associated with merchant
app.get('/api/product/menu/:merchant', (req, res) => {
  const { merchant } = req.params;
  Products.findAll({
    where: {merchant: merchant}
  })
    .then(data => res.send(data))
    .catch(err => res.send(err));
});
//add new product
app.post('/api/product/addproduct/', (req, res) => {
  const { name, merchant, price } = req.body;
  Products.create({ name, merchant, price })
    .then(data => res.send(data))
    .catch(err => res.send(err));
});
//change price of product
app.put('/changeprice/:id/:price', (req, res) => {
  const { id, price } = req.params;
  Products.update(
    {price: price},
    {returning: true, where: {id: id}}
  )
  .then(() => res.send('price updated'))
  .catch(err => res.send(err));
});
//change status of product
app.put('/changestatus/:id/:status', (req, res) => {
  const { id, status } = req.params;
  Products.update(
    {status: status},
    {returning: true, where: {id: id}}
  )
  .then(() => res.send('status updated'))
  .catch(err => res.send(err));
});
//delete product
app.delete('/api/product/deleteproduct/:id', (req, res) => {
  const { id } = req.params;
  Products.destroy({
    where: {id: id}
  })
    .then(res.send(`product ${id} deleted`));
});
//delete all products
app.delete('/deleteallproducts', (req, res) => {
  Products.destroy({
    where: {}
  })
    .then(res.send('no more products'))
    .catch(err => res.send(err));
});



/**
 * Reviews
 */

//get all reviews
app.get('/api/reviews/getall', (req, res) => {
  Reviews.findAll({
    where: {}
  })
    .then(data => res.send(data))
    .catch(err => res.send(err));
});

//get all reviews for merchant
app.get('api/reviews/:merchant', (req, res) => {
  Reviews.findAll({
    where: {MerchantId: req.params.merchant}
  })
    .then(data => res.send(data))
    .catch(err => res.send(err));
});

//add new review
app.post('/api/reviews/addreview/', (req, res) => {
  const { UserId, MerchantId, rating, message } = req.body;
  Reviews.create({ UserId, MerchantId, rating, message })
    .then(data => res.send(data))
    .catch(err => res.send(err));
});

//delete review
app.delete('/deletereview/:id', (req, res) => {
  const { id } = req.params;
  Reviews.destroy({
    where: {id: id}
  })
    .then(res.send(`review ${id} deleted`));
});
//delete all reviews
app.delete('/deleteallreviews', (req, res) => {
  Reviews.destroy({
    where: {}
  })
    .then(res.send('no more reviews'))
    .catch(err => res.send(err));
});
/**
 * Subs
 */
//get all subs
app.get('/subs', (req, res) => {
  Subs.findAll({
    where: {}
  })
    .then(data => res.send(data))
    .catch(err => res.send(err));
});
//get all users subs
app.get('/subs/:user', (req, res) => {
  Subs.findAll({
    where: {user: req.params.user}
  })
    .then(data => res.send(data))
    .catch(err => res.send(err));
});

//add new sub
app.post('/api/addsub', (req, res) => {
  const { userid, merchantid } = req.body;
  Subs.findAll({
    where: { userid, merchantid }
  })
    .then(results => {
      console.log(results)
      if (!results.length) {
        Subs.create({ UserId: userid, MerchantId: merchantid })
          .then( () => {Users.findOne({
            where: {id: userid},
            include: {
              model: Subs,
              include: Merchants
            }
          }).then(data => {
            console.log('this is the data', data);
            res.send(data);
          })
          })
      } else {
        res.send(`${user} is already following ${merchant}`);
      }
    })
    .catch(err => res.send(err));
});

//delete sub
app.delete('/api/deletesub/:userId/:merchantId', (req, res) => {
  const { userId, merchantId } = req.params;
  Subs.destroy({
    where: {userId, merchantId}
  })
    .then(res.send(`deleted`));
});
//delete all subs
app.delete('/deleteallsubs', (req, res) => {
  Subs.destroy({
    where: {}
  })
    .then(res.send('no more subs'))
    .catch(err => res.send(err));
});
/**
 * Admins
 */
//get all admins
app.get('/admins', (req, res) => {
  Admins.findAll({
    where: {}
  })
    .then(data => res.send(data))
    .catch(err => res.send(err));
});
//add new admin
app.post('/addadmin/:user/:merchant', (req, res) => {
  const { user, merchant } = req.params;
  Admins.findAll({
    where: {UserId: user, MerchantId: merchant}
  })
    .then(results => {
      if (!results.length) {
        Admins.create({ UserId: user, MerchantId: merchant })
          .then(Admins.findAll({
            where: {}
          })).then(data => res.send(data))
      } else {
        res.send(`${user} is already administrating ${merchant}`);
      }
    })
    .catch(err => res.send(err));
});
//delete admin
app.delete('/deleteadmin/:id', (req, res) => {
  const { id } = req.params;
  Admins.destroy({
    where: {id: id}
  })
    .then(res.send(`admin ${id} deleted`));
});
//delete all admins
app.delete('/deletealladmins', (req, res) => {
  Admins.destroy({
    where: {}
  })
    .then(res.send('no more admins'))
    .catch(err => res.send(err));
});

//add admin by email
app.post('/admin/addbyemail', (req, res) => {
  const { email, merchant } = req.body;
  Users.findOne({
    where: {email: email}
  })
  .then(userData => {
    Admins.create({ UserId: userData.id, MerchantId: merchant })
      .then(moon => console.log(moon))
      .catch(err => res.send(err));
    res.send(userData);
  })
  .catch(err => res.send(err));
});

//add delete by email
app.delete('/admin/deletebyemail', (req, res) => {
  const { email, merchant } = req.body;
  Users.findOne({
    where: {email: email}
  })
  .then(userData => {
    Admins.destroy({where: { UserId: userData.id, MerchantId: merchant }})
      .then(moon => console.log(moon))
      .catch(err => res.send(err));
    res.send(userData);
  })
  .catch(err => res.send(err));
});

app.listen(PORT, (() => {
  console.log(`Server listening at http://127.0.0.1:${PORT}`);
}));

