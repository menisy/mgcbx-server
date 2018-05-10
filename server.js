const io = require('socket.io')();

var position = {x: 0, y: 0}

io.on('connection', (client) => {
  client.on('subscribeToView', () => {
    console.log('client is subscribing to view');
    setInterval(() => {
      client.emit('position', position);
    }, 100);
  });

  client.on('subscribeToMobView', () => {
    console.log('client is subscribing to mob view');
  });


  client.on('sendPosition', (pos) => {
    console.log('client sent orientation', pos.x, pos.y);
    position.x = pos.x;
    position.y = pos.y;
  });
});


const port = 8000;
io.listen(port);
console.log('listening on port ', port);
