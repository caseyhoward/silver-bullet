class Util {
  parseJSON(text, callback) {
    var tryParse = (text) => {
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

module.exports = Util;
