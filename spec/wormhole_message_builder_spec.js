var wormholeMessageBuilder = require('../src/wormhole_message_builder');

describe('wormholeMessageBuilder', function() {
  expect(wormholeMessageBuilder.build({type: 'publish', topic: 'cool', data: {abc: 123}, uuid: 'some uuid'})).to.deep.equal(
    {
      '__wormhole__': {
        '__type__': 'publish',
        '__topic__': 'cool',
        '__data__': {abc: 123},
        '__uuid__': 'some uuid'
      }
    }
  );
});

