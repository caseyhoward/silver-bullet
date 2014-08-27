var serializer = require('../src/silver_bullet/serializer');
var SilverBulletMessageSender = require('../src/silver_bullet_message_sender');
var MessagePoster = require('../src/message_poster');

describe('silverBulletMessageSender', function() {
  var silverBulletMessageSender, sandbox, message, silverBulletWindow, messagePoster;

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
    silverBulletMessageSender = new SilverBulletMessageSender(silverBulletWindow, 'http://origin.host');
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
      silverBulletMessageSender.publish('log in', {abc: 123}, 'some uuid');
    });
  });

  describe('#resolve', function() {
    it('resolves', function() {
      expectPostMessage({type: 'response', topic: 'log in', data: {abc: 123}, uuid: 'some uuid'});
      silverBulletMessageSender.resolve('log in', {abc: 123}, 'some uuid');
    });
  });

  describe('#sendReady', function() {
    it('sends ready', function() {
      expectPostMessage({type: 'ready'});
      silverBulletMessageSender.sendReady();
    });
  });

  describe('#sendBeacon', function() {
    it('sends beacon', function() {
      expectPostMessage({type: 'beacon'});
      silverBulletMessageSender.sendBeacon();
    });
  });
});
