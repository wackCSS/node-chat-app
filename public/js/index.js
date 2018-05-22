var socket = io();

socket.on('connect', function() {
  console.log('connected to server');
});

socket.on('disconnect', function() {
  console.log('Disconnected from server');
});

socket.on('newMessage', function(message) {
  console.log('new message', message);
});

socket.emit('createMessage', {
  from: 'mike@test.com',
  text: 'This is my message'
});