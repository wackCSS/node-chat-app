var expect = require('expect');
var {isRealString} = require('./validation');

const validString = 'foobar';
const validString2 = ' this is valid ';
const invalidString = '    ';
const number = 123;
const bool = true;

describe('isRealString', () => {
  it('should return true with a valid string', () => {
    expect(isRealString(validString)).toBe(true);
    expect(isRealString(validString2)).toBe(true);
  });

  it('should return false with an empty string', () => {
    expect(isRealString(invalidString)).toBe(false);
  });

  it('should return false with a non string', () => {
    expect(isRealString(number)).toBe(false);
    expect(isRealString(bool)).toBe(false);
  });
});

