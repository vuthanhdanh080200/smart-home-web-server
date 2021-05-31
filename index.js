var http = require("http");
http
  .createServer(function (req, res) {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.write("Hello World!");
    res.end();
  })
  .listen(process.env.PORT || 5000);

var firebaseConfig = {
  apiKey: "AIzaSyCEzhRWBpG6O2a-pMYGviw2PKXWXcZupQ4",
  authDomain: "smart-home-system-3905e.firebaseapp.com",
  projectId: "smart-home-system-3905e",
  storageBucket: "smart-home-system-3905e.appspot.com",
  messagingSenderId: "338524254078",
  appId: "1:338524254078:web:7b136840e707bbbd158d2f",
  measurementId: "G-YEWHCYX3S5",
};

var firestore = require("firebase/firestore");
var firebase = require("firebase");
if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
  console.log("Connected to firebase");
}

const db = firebase.firestore();

var mqtt = require("mqtt");
var url = "mqtt://io.adafruit.com";

var username = "lengochieu6102";
var password = "aio_OKBC45gsN3d6VlO1WUw0rlDLl9Sr";

var client = mqtt.connect(url, { username: username, password: password });

var topic = "lengochieu6102/feeds/bk-iot-button";
client.on("connect", function () {
  console.log("connected");
  client.subscribe(topic, function (err) {
    if (!err) {
      console.log("subscribed");
      db.collection("cities")
        .doc("SF")
        .onSnapshot((doc) => {
          var city = doc.data();
          //console.log(city.capital);
          client.publish(topic, city.capital.toString());
        });
    }
  });
});

client.on("message", function (topic, message) {
  var citiesRef = db.collection("cities");
  citiesRef.doc("SF").set({
    capital: message.toString(),
  });
});
