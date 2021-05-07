const { messaging } = require('./firebaseinit.js');

const sendNotificationToClient = (tokens, data) => {
  //send message to provided tokens
  messaging
    .sendMulticast({ tokens, data })
    .then(response => {
      const successes = response.responses.filter(r => r.success).length;
      const failures = response.responses.filter(r => !r.success).length;
      console.log(`notifcations sent: ${successes} successes and ${failures} failures!`)
    })
    .catch(err => console.log('send notifs error', err));
}

module.exports = {
  sendNotificationToClient
}