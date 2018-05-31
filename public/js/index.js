var socket = io();
var messageContainer = $('#messages')[0];
var locationButton = $('#sendLocation');

socket.on('connect', function() {
  console.log('connected to server');
});

socket.on('disconnect', function() {
  console.log('Disconnected from server');
});

socket.on('newMessage', function(message) {
  console.log('new message', message);
  var messageHTML = `<li><p>${message.from}: ${message.text}</p></li>`;
  $(messageHTML).appendTo(messageContainer);
  $('[name=message]')[0].value = '';
});

socket.on('newLocationMessage', function(message){
  var messageHTML = `<li>${message.from} <a target="_blank" href="${message.url}">My current location</a></li>`;
  $(messageHTML).appendTo(messageContainer);
});

$('#message-form').on('submit', function(e) {
  e.preventDefault();
  
  socket.emit('createMessage', {
    from: 'User',
    text: $('[name=message]').val()
  }, function(data) {    
  });
});

locationButton.on('click', function() {
  if (!navigator.geolocation) {
    return alert('Geoloaction not available (Not supported by your browser)');
  }

  navigator.geolocation.getCurrentPosition( function(position) {
    console.log(position);

    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });

  }, function() {
    alert('Unable to fetch your location')
  });

});

