var silverBulletMessageParser = require('../src/silver_bullet_message_parser');

describe('silverBulletMessageParser', function() {
  it('parses silverBullet messages', function() {
    var message = {
      '__silverBullet__': {
        '__type__': 'publish',
        '__topic__': 'cool',
        '__data__': { abc: 123 },
        '__uuid__': 'some uuid'
      }
    };
    expect(silverBulletMessageParser.parse(message)).to.deep.equal({
      type: 'publish',
      topic: 'cool',
      data: { abc: 123 },
      uuid: 'some uuid'
    });
  });
});


