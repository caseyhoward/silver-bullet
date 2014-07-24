var wormholeMessageParser = require('../src/wormhole_message_parser');

describe('wormholeMessageParser', function() {
  it('parses wormhole messages', function() {
    var message = {
      '__wormhole__': {
        '__type__': 'publish',
        '__topic__': 'cool',
        '__data__': { abc: 123 }
      }
    };
    expect(wormholeMessageParser.parse(message)).to.deep.equal({
      type: 'publish',
      topic: 'cool',
      data: { abc: 123 }
    });
  });
});


