var sinon = require('sinon');
var chai = require('chai');
var expect = chai.expect;

describe('Util', function() {
  var jsonParser = require("../src/util.js").jsonParser();

  it('returns parsed JSON', function() {
    var json = jsonParser.parse('{"a": [1, "2"]}')
    expect(json).to.deep.equal({a: [1, '2']});
  });

  it('returns null when there is an exception', function() {
    expect(jsonParser.parse('{')).to.equal(undefined);
  });

  it('yields the parsed data', function() {
    var wasCalled = false;
    var result = jsonParser.parse('{"test": 123}', function(data) {
      wasCalled = true;
      expect(data).to.deep.equal({test: 123});
      return 'blah';
    });
    expect(result).to.equal('blah');
    expect(wasCalled).to.equal(true);
  });
});
