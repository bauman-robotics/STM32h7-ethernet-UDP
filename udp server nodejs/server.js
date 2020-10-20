const dgram = require("dgram");
const PORT = 55151;
const HOST = '192.168.0.10';

const message = Buffer.from("Hey there!!", "utf8");

const client = dgram.createSocket('udp4');

client.on("message", function (message, remote) {
    console.log(`UDP message received from: ${remote.address}:${remote.port} - ${message}`);
});

setInterval(sendSTM, 1000);

function sendSTM() {
    client.send(message, 0, message.length, PORT, HOST, function(err, bytes) {
        if (err) {
            console.error(`UDP message send error:`, err);
        } else {
            console.log(`UDP message sent to ${HOST}:${PORT}`);
        }
    });
}

// const express = require('express');
// const app = express();
// app.use(express.static('public'));

// app.get('/', (req, res) => {
//     res.send('An alligator approaches!');
// });

// app.listen(3000, () => console.log('Gator app listening on port 3000!'));