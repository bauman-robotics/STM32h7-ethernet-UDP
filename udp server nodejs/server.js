// UDP
const dgram = require("dgram");
const PORT = 55151;
const HOST = "192.168.0.10";

const msg = Buffer.from("Hey there!!", "utf8");
let inCounter = 0;
let outCounter = 0;
let current = "3";
let voltage = "5";
const client = dgram.createSocket("udp4");

client.on("message", function (message, remote) {
  current = message.readIntLE(0, 4);
  voltage = message.readIntLE(4, 4);
  console.log(
    `UDP message received from: ${remote.address}:${remote.port} - ${message}`
  );
  outCounter++;
});

client.bind(PORT);

// setInterval(sendSTM, 10);

function sendSTM() {
  client.send(msg, 0, msg.length, PORT, HOST, function (err, bytes) {
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
  let msg = {};
  msg.current = current;
  msg.voltage = voltage;
  io.sockets.emit("sample", msg);
  console.log(msg);
}
