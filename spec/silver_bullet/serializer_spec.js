var serializer = require('../../src/silver_bullet/serializer');

describe('serializer', function() {
  describe('#build', function() {
    it('builds a stringified message', function() {
      var serializedMessage = serializer.serialize({type: 'publish', topic: 'cool', data: {abc: 123}, uuid: 'some uuid'});
      expect(JSON.parse(serializedMessage)).to.deep.equal(
        {
          '__silverBullet__': {
            '__type__': 'publish',
            '__topic__': 'cool',
            '__data__': {abc: 123},
            '__uuid__': 'some uuid'
          }
        }
      );
    });
  });
});

