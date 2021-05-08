const express = require('express');
const notifs = express.Router();
const { sendNotificationToClient } = require('./notify.js');
const { Merchants, Subs, Users } = require('../db');

notifs.post('/open/:merchid', async (req, res) => {
  const { merchName, message } = req.body;
  const { merchid } = req.params;
  try {
    const data = await Merchants.findOne({where: {id: merchid}, include: {
      model: Subs,
      include: [Users]
    }});
    const tokens = data.Subs.map(sub => sub.User.cloudinary_id)
    console.log(tokens)
    //res.send(tokens)
    //const tokens = ['ex5V3jWylZHoRBCLHCkQ7w:APA91bGqVH-vkCyAiUTOk8Ndj9GHKOkXLuvkg-XetJnR2QgJarak3LOOZpzko_3cG9Tlx5gG8s8a4dM8nuun8T3c3oUW5NnROdRblaZpIyyIm6Xa3wAmn6ixO0TEOl0OSJKBPulqFiPh'];
    const notifcationData = {
      title: ` ${merchName} is now open for business`,
      body: message
    }
    sendNotificationToClient(tokens, notifcationData)
    res.status(200).send('success!')
  } catch(err) {
    res.status(200).send(err)
  }
})

notifs.put('/:userid', (req, res) => {
  const { userid } = req.params;
  const { token } = req.body;

  Users.update({cloudinary_id: token},{where: {id: userid}})
    .then(() => console.log('success!'))
    .catch(err => console.log('err', err))
})

module.exports = {
  notifs,
}