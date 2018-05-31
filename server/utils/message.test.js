var expect = require('expect');
var {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
  it('should generate correct message object', () => {
    var from = 'testEmail@test.com';
    var text = 'This is my test text';

    var message = generateMessage(from, text);

    expect(message.createdAt).toBeAn('number');
    expect(message).toInclude({
      from,
      text
    });
  });
});

describe('generateLocationMessage', () => {
  it('should generate correct location object', () => {
    var from = 'testEmail@test.com';    
    var lat = 10;
    var lng = 20;
    var url = `https://www.google.com/maps?q=${lat},${lng}`

    var message = generateLocationMessage(from, lat, lng);

    expect(message.createdAt).toBeAn('number');
    expect(message.url).toBeAn('string');    
    expect(message).toInclude({
      from,
      url
    });
  });
});