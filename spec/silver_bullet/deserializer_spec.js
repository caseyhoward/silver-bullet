var deserializer = require('../../src/silver_bullet/deserializer');

describe('deserializer', function() {
  it('deserializes silverBullet messages', function() {
    var message = JSON.stringify({
      '__silverBullet__': {
        '__type__': 'publish',
        '__topic__': 'cool',
        '__data__': { abc: 123 },
        '__uuid__': 'some uuid'
      }
    });
    expect(deserializer.deserialize(message)).to.deep.equal({
      type: 'publish',
      topic: 'cool',
      data: { abc: 123 },
      uuid: 'some uuid'
    });
  });
});


