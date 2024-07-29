// Scripts for firebase and firebase messaging
importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);

// Initialize the Firebase app in the service worker
// "Default" Firebase configuration (prevents errors)
const firebaseConfig = {
  apiKey: "AIzaSyBAn0qds2ongfFpLAPbIs6pVsIr5V3Mf8Y",
  authDomain: "test-e37ab.firebaseapp.com",
  projectId: "test-e37ab",
  storageBucket: "test-e37ab.appspot.com",
  messagingSenderId: "301151428688",
  appId: "1:301151428688:web:2f4486b2636ebcaf1cf155"
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.image,
  };
  window.alert("working");

  window.self.registration.showNotification(notificationTitle, notificationOptions);
});