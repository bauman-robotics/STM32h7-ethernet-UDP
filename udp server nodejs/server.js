// UDP
const dgram = require("dgram");
const PORT = 55151;
const HOST = "192.168.0.10";

const message = Buffer.from("Hey there!!", "utf8");
let inCounter = 0;
let outCounter = 23;
let current = "";
const client = dgram.createSocket("udp4");

client.on("message", function (message, remote) {
  current = message;
  console.log(
    `UDP message received from: ${remote.address}:${remote.port} - ${message}`
  );
  outCounter++;
});

client.bind(PORT);

// setInterval(sendSTM, 10);
// setInterval(Ratio, 1000);

function sendSTM() {
  client.send(message, 0, message.length, PORT, HOST, function (err, bytes) {
    if (err) {
      console.error(`UDP message send error:`, err);
    } else {
      // console.log(`UDP message sent to ${HOST}:${PORT}`);
      inCounter++;
    }
  });
}

// HTTP
const express = require("express");
const app = express();
const server = app.listen(3000, () =>
  console.log("Gator app listening on port 3000!")
);
app.use(express.static("public"));
app.get("/", (req, res) => {
  res.send("An alligator approaches!");
});

// WEBSOCKET
const io = require("socket.io").listen(server);
io.sockets.on("connection", function (socket) {});
setInterval(test, 2000);

function test() {
  io.sockets.emit("current", current);
  io.sockets.emit("voltage", outCounter);
}
