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
    res.send(data)
    // const tokens = [];
    // const notifcationData = {
    //   title: ` ${merchName} is now open for business`,
    //   body: message
    // }
    // sendNotificationToClient(tokens, notifcationData)
    // res.status(200).send('success!')
  } catch(err) {
    res.status(200).send(err)
  }
})

module.exports = {
  notifs,
}