const express = require('express');
const notifs = express.Router();
const { sendNotificationToClient } = require('./notify.js');

notifs.post('/open/:merchid', async (req, res) => {
  const { merchName, message } = req.body;
  const { merchid } = req.params;
  try {
    const tokens = [];
    const notifcationData = {
      title: ` ${merchName} is now open for business`,
      body: message
    }
    sendNotificationToClient(tokens, notifcationData)
    res.status(200).send('success!')
  } catch(err) {
    res.status(200).send('notifs failed!')
  }
})

module.exports = {
  notifs,
}