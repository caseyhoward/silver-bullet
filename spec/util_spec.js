var sinon = require('sinon');
var chai = require('chai');
var expect = chai.expect;

describe('Util', function() {
  var jsonParser = require("../src/util.js").jsonParser();

  it('returns parsed JSON', function() {
    var json = jsonParser.parse('{"a": [1, "2"]}')
    expect(json).to.deep.equal({a: [1, '2']});
  });

  // it('returns null when there is an exception', function() {
  //   expect(util.parseJSON('{')).toEqual(null);
  // });

  // it('yields the parsed data', function() {
  //   var wasCalled = false;
  //   var result = util.parseJSON('{"test": 123}', function(data) {
  //     wasCalled = true;
  //     expect(data).toEqual({test: 123});
  //     return 'blah';
  //   });
  //   expect(result).toEqual('blah');
  //   expect(wasCalled).toBe(true);
  // });
});
