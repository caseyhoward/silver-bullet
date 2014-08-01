var wormholeMessageBuilder = require('../src/wormhole_message_builder');
var WormholeMessageSender = require('../src/wormhole_message_sender');
var MessagePoster = require('../src/message_poster');

describe('wormholeMessageSender', function() {
  var wormholeMessageSender, sandbox, message, wormholeWindow, messagePoster;

  beforeEach(function() {
    sandbox = sinon.sandbox.create();
    wormholeWindow = {};
    message = {a: 1, uuid: 'some uuid'};
    messagePoster = {
      postMessage: function() {}
    }
    sandbox.mock(messagePoster).expects('postMessage').withArgs(message);
    sandbox.stub(MessagePoster, 'create').withArgs(wormholeWindow, 'http://origin.host').returns(messagePoster);
    wormholeMessageSender = new WormholeMessageSender(wormholeWindow, 'http://origin.host');
  });

  afterEach(function() {
    sandbox.restore();
  });

  describe('#publish', function() {
    it('publishes', function() {
      sandbox.stub(wormholeMessageBuilder, 'build').withArgs(sinon.match({type: 'publish', topic: 'log in', data: {abc: 123}, uuid: 'some uuid'})).returns(message);
      wormholeMessageSender.publish('log in', {abc: 123}, 'some uuid');
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
