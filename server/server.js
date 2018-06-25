const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

const {generateMessage, generateLocationMessage} = require('./utils/message');

const publicPath = path.join(__dirname, '../public'); // this will remove the unnecessary ../ from the path.
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('connected to client');

  socket.on('disconnect', () => {
    console.log('Disconnected from server');
    const user = users.removeUser(socket.id);
    //console.log('user = ', user);
    if (user) {
      console.log(user.name);
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left`));
    }
  });

  socket.on('updateUserList', (users) => {
    //console.log('list:', users);
  });

  socket.on('join', (params, callback) => {
    var name = params.name;
    var room = params.room;

    if (!isRealString(name) || !isRealString(room)) {
      var err = 'Please enter a name and room';
      return callback(err);
    }

    socket.join(room);

    users.removeUser(socket.id);
    users.addUser(socket.id, name, room);

    io.to(room).emit('updateUserList', users.getUserList(room));

    // Only sent to user who connects
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

    // sent to everyone apart from user who connected
    socket.broadcast.to(room).emit('newMessage', generateMessage('Admin', `${name} has joined`));

    callback();
  });

  socket.on('createMessage', (message, callback) => {
    const user = users.getUser(socket.id);

    if (user && isRealString(message.text)) {
      const name = user.name;
      const room = user.room;

      io.to(room).emit('newMessage', generateMessage(name, message.text));
    }
    callback();
  });

  socket.on('createLocationMessage', (coords) => {
    const user = users.getUser(socket.id);
    if (user) {
      const name = user.name;
      const room = user.room;
      io.to(room).emit('newLocationMessage', generateLocationMessage(name, coords.latitude, coords.longitude));
    }
  });
});

server.listen(port, () => {
  console.log(`started on port ${port}`);
});
