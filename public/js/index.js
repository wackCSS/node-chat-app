var socket = io();
var messageContainer = $('#messages')[0];
var locationButton = $('#sendLocation');
var messageTextField = $('[name=message]');

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
  
  if ( messageTextField.val() === '') {
    return;
  }

  socket.emit('createMessage', {
    from: 'User',
    text: messageTextField.val()
  }, function(data) {
    messageTextField.val('');  
  });
});

locationButton.on('click', function() {
  if (!navigator.geolocation) {
    locationButton.attr('disabled', 'disabled');
    return alert('Geoloaction not available (Not supported by your browser)');    
  }  

  locationButton
    .attr('disabled', 'disabled')
    .text('Sending location...');

  navigator.geolocation.getCurrentPosition( function(position) {
    console.log(position);    
    locationButton
      .removeAttr('disabled', 'disabled')
      .text('Send location');
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });

  }, function() {
    alert('Unable to fetch your location');
    locationButton
      .removeAttr('disabled', 'disabled')
      .text('Send location');
  });
  
});

