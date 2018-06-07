var moment = require('moment');


var generateMessage = (from, text) => {
  return {
    from,
    text,
    createdAt: new moment().valueOf()
  };
};

var generateLocationMessage = (from, lat, lng) => {
  return {
    from,
    url: `https://www.google.com/maps?q=${lat},${lng}`,
    createdAt: new moment().valueOf()
  };
};

module.exports = {generateMessage, generateLocationMessage};