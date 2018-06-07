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
  var formattedTime = moment(message.createdAt).format('HH:mm');
  var template = $('#message-template').html();
  var html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    time: formattedTime
  });
  
  $(html).appendTo(messageContainer);
  $('[name=message]')[0].value = '';
});

socket.on('newLocationMessage', function(message){
  var formattedTime = moment(message.createdAt).format('HH:mm'); 
  var template = $('#location-message-template').html();
  var html = Mustache.render(template, {
    url: message.url,
    from: message.from,
    time: formattedTime
  });
  
  $(html).appendTo(messageContainer);
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

