var sinon = require('sinon');
var chai = require('chai');
var expect = chai.expect;

describe('JsonParser', function() {
  var jsonParser = require("../src/json_parser.js");

  it('returns parsed JSON', function() {
    var json = jsonParser.parse('{"a": [1, "2"]}')
    expect(json).to.deep.equal({a: [1, '2']});
  });

  it('returns null when there is an exception', function() {
    expect(jsonParser.parse('{')).to.equal(undefined);
  });

  it('yields the parsed data', function() {
    var callback = sinon.stub().withArgs(sinon.match({test: 123})).returns('blah');
    var result = jsonParser.parse('{"test": 123}', callback);
    expect(result).to.equal('blah');
  });
});
