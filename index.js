var http = require("http");
http
  .createServer(function (req, res) {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.write("Hello World!");
    res.end();
  })
  .listen(process.env.PORT || 5000);

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
      client.publish(topic, "HAHA");
    }
  });
});

client.on("message", function (topic, message) {
  console.log(message.toString());
  if (message === "Button On") {
    /// Do some thing in firebase
  }
});
