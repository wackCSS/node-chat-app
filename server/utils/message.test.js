var expect = require('expect');
var {generateMessage} = require('./message');

describe('generateMessage', () => {
  it('should generate correct message object', () => {
    var from = 'testEmail@test.com';
    var text = 'This is my test text';

    var messageReturn = generateMessage(from, text);
    expect(messageReturn.createdAt).toBeAn('number');
    expect(messageReturn).toInclude({
      from,
      text
    });
  });
});