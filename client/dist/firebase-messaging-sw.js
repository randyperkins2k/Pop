// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/8.5.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.5.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing the generated config
var firebaseConfig = {
  apiKey: "AIzaSyCUQ6Ibe-LnZ8hpE5B3__P9jm7umgqIS44",
  authDomain: "opsparkpopup.firebaseapp.com",
  projectId: "opsparkpopup",
  storageBucket: "opsparkpopup.appspot.com",
  messagingSenderId: "926979096266",
  appId: "1:926979096266:web:b2ab879ef3f7986ef47e33",
  measurementId: "G-E7M2WC3W5L"
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function(payload) {
  console.log('Received background message ', payload);

  const notificationTitle = payload.data.title;
  const notificationOptions = {
    body: payload.data.body,
    icon: './a47042f201eca7299adbbf8a197f6220.jpg'
  };

  return self.registration.showNotification(notificationTitle,
    notificationOptions);
});

self.addEventListener('notificationclick', event => {
  console.log(event)
  return event;
});