var EventEmitter = require('../src/event_emitter');

describe('EventEmitter', function() {
   var eventEmitter;
   var push;
   var pushFunctions;
   var cools;

   beforeEach(function() {
     cools = [];
     pushFunctions = {};
     eventEmitter = EventEmitter.create();
     push = function(value) {
       pushFunctions[value] = pushFunctions[value] || function() {
         cools.push(value);
       }
       return pushFunctions[value];
     };
   })

  it('emits events to listeners', function() {
    eventEmitter.on('cool', push(1));
    eventEmitter.on('not cool', push('not cool, man'));
    eventEmitter.on('cool', push(2))
    eventEmitter.emit('cool');
    expect(cools).to.deep.equal([1, 2]);
  });

  it('stops listening', function() {
    eventEmitter.on('cool', push(1));
    eventEmitter.on('not cool', push('not cool, man'));
    eventEmitter.on('cool', push(2))
    eventEmitter.emit('cool');
    eventEmitter.off('cool', push(2))
    eventEmitter.emit('cool');
    expect(cools).to.deep.equal([1, 2, 1]);
  });
});
