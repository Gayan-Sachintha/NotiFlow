const express = require('express');
const bodyParser = require('body-parser');
const { ref, push, update, remove, onValue, orderByChild, equalTo, query } = require('firebase/database');
const WebSocket = require('ws');

const router = express.Router();
router.use(bodyParser.json());

// Create a WebSocket server
const wss = new WebSocket.Server({ noServer: true });

wss.on('connection', function connection(ws) {
  console.log('A new client connected');

  ws.on('message', function incoming(message) {
    console.log('received: %s', message);

    // Broadcast received message to all clients
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  ws.on('close', function close() {
    console.log('Client disconnected');
  });
});

// HTTP POST endpoint for call records
router.post('/callRecords', async (req, res) => {
    // Access parsed JSON data from the request body
    const requestData = req.body;
    console.log(requestData);
    
    // Send the received data to WebSocket clients
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(requestData));
      }
    });

    return res.send("Message Sent");
});

module.exports = router;
