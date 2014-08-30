var serializer = require('../../src/silver_bullet/serializer');
var SilverBulletMessagePoster = require('../../src/silver_bullet/message_poster');
var MessagePoster = require('../../src/message_poster');

describe('silverBulletMessagePoster', function() {
  var silverBulletMessagePoster, sandbox, message, silverBulletWindow, messagePoster;

  beforeEach(function() {
    sandbox = sinon.sandbox.create();
    silverBulletWindow = {};
    message = {a: 1, uuid: 'some uuid'};
    messagePoster = {
      postMessage: function() {}
    };
    sandbox.stub(MessagePoster, 'create').withArgs(
      silverBulletWindow,
      'http://origin.host',
      sinon.match({serialize: serializer.serialize})
    ).returns(messagePoster);
    silverBulletMessagePoster = new SilverBulletMessagePoster(silverBulletWindow, 'http://origin.host');
  });

  afterEach(function() {
    sandbox.restore();
  });

  var expectPostMessage = function (message) {
    sandbox.mock(messagePoster).expects('postMessage').withArgs(message);
  };

  describe('#publish', function() {
    it('publishes', function() {
      expectPostMessage({type: 'publish', topic: 'log in', data: {abc: 123}, uuid: 'some uuid'});
      silverBulletMessagePoster.publish('log in', {abc: 123}, 'some uuid');
    });
  });

  describe('#resolve', function() {
    it('resolves', function() {
      expectPostMessage({type: 'response', topic: 'log in', data: {abc: 123}, uuid: 'some uuid'});
      silverBulletMessagePoster.resolve('log in', {abc: 123}, 'some uuid');
    });
  });

  describe('#sendReady', function() {
    it('sends ready', function() {
      expectPostMessage({type: 'ready'});
      silverBulletMessagePoster.sendReady();
    });
  });

  describe('#sendBeacon', function() {
    it('sends beacon', function() {
      expectPostMessage({type: 'beacon'});
      silverBulletMessagePoster.sendBeacon();
    });
  });
});
