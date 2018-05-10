'use strict';

const express = require('express');
const socketIO = require('socket.io');
const path = require('path');

const PORT = process.env.PORT || 8000;
const INDEX = path.join(__dirname, 'index.html');

const server = express()
  .use((req, res) => res.sendFile(INDEX) )
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));

const io = socketIO(server);


var position = {x: 0, y: 0, z: 0}


io.on('connection', (client) => {
  client.on('subscribeToView', () => {
    console.log('client is subscribing to view');
    setInterval(() => {
      client.emit('position', position);
    }, 50);
  });

  client.on('subscribeToMobView', () => {
    console.log('client is subscribing to mob view');
  });


  client.on('sendPosition', (pos) => {
    // console.log('client sent orientation', pos.x, pos.y, pos.z);
    position.x = pos.x;
    position.y = pos.y;
    position.z = pos.z;
  });
});
