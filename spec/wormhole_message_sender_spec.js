var wormholeMessageBuilder = require('../src/wormhole_message_builder');
var WormholeMessageSender = require('../src/wormhole_message_sender');
var messagePoster = require('../src/message_poster');

describe('wormholeMessageSender', function() {
  var wormholeMessageSender, sandbox, message, wormholeWindow;

  beforeEach(function() {
    sandbox = sinon.sandbox.create();
    message = {a: 1, uuid: 'some uuid'};
    wormholeWindow = {};
    sandbox.mock(messagePoster).expects('postMessage').withArgs(wormholeWindow, message, '*');
    wormholeMessageSender = new WormholeMessageSender(wormholeWindow);
  });

  afterEach(function() {
    sandbox.restore();
  });

  describe('#publish', function() {
    it('publishes', function() {
      sandbox.stub(wormholeMessageBuilder, 'build').withArgs(sinon.match({type: 'publish', topic: 'log in', data: {abc: 123}, uuid: 'some uuid'})).returns(message);
      expect(wormholeMessageSender.publish('log in', {abc: 123}, 'some uuid'));
    });
  });

  describe('#respond', function() {
    it('responds', function() {
      sandbox.stub(wormholeMessageBuilder, 'build').withArgs(sinon.match({type: 'response', topic: 'log in', data: {abc: 123}, uuid: 'some uuid'})).returns(message);
      wormholeMessageSender.respond('log in', {abc: 123}, 'some uuid');
    });
  });

  describe('#sendReady', function() {
    it('sends ready', function() {
      sandbox.stub(wormholeMessageBuilder, 'build').withArgs(sinon.match({type: 'ready'})).returns(message);
      wormholeMessageSender.sendReady();
    });
  });

  describe('#sendBeacon', function() {
    it('sends beacon', function() {
      sandbox.stub(wormholeMessageBuilder, 'build').withArgs(sinon.match({type: 'beacon'})).returns(message);
      wormholeMessageSender.sendBeacon();
    });
  });
});
