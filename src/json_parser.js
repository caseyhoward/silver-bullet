var JsonParser = {
  parse: function(text, callback) {
    var tryParse = function(text) {
      try {
        return JSON.parse(text);
      } catch (e) {
      }
    };
    var parsedJson = tryParse(text);
    if (callback && parsedJson) {
      return callback(parsedJson);
    } else {
      return parsedJson;
    }
  }
};

module.exports = JsonParser;
