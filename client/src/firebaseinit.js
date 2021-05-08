import firebase from 'firebase/app';
import 'firebase/messaging';

const config = {
  apiKey: "AIzaSyCUQ6Ibe-LnZ8hpE5B3__P9jm7umgqIS44",
  authDomain: "opsparkpopup.firebaseapp.com",
  projectId: "opsparkpopup",
  storageBucket: "opsparkpopup.appspot.com",
  messagingSenderId: "926979096266",
  appId: "1:926979096266:web:b2ab879ef3f7986ef47e33",
  measurementId: "G-E7M2WC3W5L"
}

firebase.initializeApp(config)

const messaging = firebase.messaging();

export const requestFirebaseNotifPermission = async (callback) => {
  // return new Promise((resolve, reject) => {
  //   Notification
  //     .requestPermission()
  //     .then(() => messaging.getToken())
  //     .then((firebaseToken) => {
  //       console.log(firebaseToken);
  //       return firebaseToken
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // })
  try {
    const firebaseToken = await Notification
        .requestPermission()
        .then(() => messaging.getToken())
        .then((firebaseToken) => {
          //console.log(firebaseToken);
          return firebaseToken
        })
        .catch((err) => {
          console.log(err);
        });
      return firebaseToken
  } catch(e) {
    console.log('firebase token error', e)
  }
}

export const onMessageListener  = () => {
  new Promise((resolve => {
    messaging.onMessage((payload) => {
      resolve(payload);
    })
  }))
}