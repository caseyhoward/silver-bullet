var wormholeMessageBuilder = require('../src/wormhole_message_builder');

describe('wormholeMessageBuilder', function() {
  expect(wormholeMessageBuilder.build('publish', 'cool', {abc: 123})).to.deep.equal(
    {
      '__wormhole__': {
        '__type__': 'publish',
        '__topic__': 'cool',
        '__data__': { abc: 123 }
      }
    }
  );
});

