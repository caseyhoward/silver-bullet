var silverBulletMessageBuilder = require('../src/silver_bullet_message_builder');

describe('silverBulletMessageBuilder', function() {
  expect(silverBulletMessageBuilder.build({type: 'publish', topic: 'cool', data: {abc: 123}, uuid: 'some uuid'})).to.deep.equal(
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

