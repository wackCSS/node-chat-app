const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public'); // this will remove the unnecessary ../ from the path.
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('connected to client');

  socket.on('disconnect', (socket) => {
    console.log('Disconnected from server');
  });  

  socket.on('createMessage', (data) => {
    console.log('create message', data);
    io.emit('newMessage', {
      from: data.from,
      text: data.text,
      createdAt: new Date().getTime()
    }); 
  });
});

server.listen(port, () => {
  console.log(`started on port ${port}`);
});
