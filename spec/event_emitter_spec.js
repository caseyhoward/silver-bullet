var EventEmitter = require('../src/event_emitter');

describe('EventEmitter', function() {
  var eventEmitter;

  beforeEach(function() {
    eventEmitter = EventEmitter.create();
  });

  it('emits events to listeners', function() {
    var cools = [];
    eventEmitter.on('cool', function() {
      cools.push(1);
    });
    eventEmitter.on('not cool', function() {
      cools.push('not cool, man');
    });
    eventEmitter.on('cool', function() {
      cools.push(2);
    });
    eventEmitter.emit('cool');
    expect(cools).to.deep.equal([1, 2]);
  });
});
