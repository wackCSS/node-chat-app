const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');

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

  // Only sent to user who connects
  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

  // sent to everyone apart from user who connected
  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user has joined'));

  socket.on('createMessage', (message, callback) => {
    console.log('create message', message);
    io.emit('newMessage', generateMessage(message.from, message.text));
    callback('server CB message');
  });

  socket.on('createLocationMessage', (coords) => {    
    io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));    
  });
});

server.listen(port, () => {
  console.log(`started on port ${port}`);
});
