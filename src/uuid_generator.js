var UUID = require('uuid-js');

module.exports = {
  generate: function() {
    return UUID.create().toString();
  }
};
