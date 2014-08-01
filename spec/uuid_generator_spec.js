var expect = require('chai').expect;
var uuidGenerator = require('../src/uuid_generator');
var _ = require('lodash');

describe('uuidGenerator', function() {
  var uuidRegex = /([a-f\d]{8}(-[a-f\d]{4}){3}-[a-f\d]{12}?)/;

  it('generates uuids in the proper format', function() {
    expect(uuidGenerator.generate()).to.match(uuidRegex);
  });

  it('generates uniq uuids', function() {
    var uuids = [uuidGenerator.generate(), uuidGenerator.generate(), uuidGenerator.generate()];
    expect(_.uniq(uuids).length).to.equal(3);
  });
});
