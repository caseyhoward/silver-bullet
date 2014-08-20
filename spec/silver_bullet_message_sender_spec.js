var silverBulletMessageBuilder = require('../src/silver_bullet_message_builder');
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
    sandbox.mock(messagePoster).expects('postMessage').withArgs(message);
    sandbox.stub(MessagePoster, 'create').withArgs(silverBulletWindow, 'http://origin.host').returns(messagePoster);
    silverBulletMessageSender = new SilverBulletMessageSender(silverBulletWindow, 'http://origin.host');
  });

  afterEach(function() {
    sandbox.restore();
  });

  describe('#publish', function() {
    it('publishes', function() {
      sandbox.stub(silverBulletMessageBuilder, 'build').withArgs(sinon.match({type: 'publish', topic: 'log in', data: {abc: 123}, uuid: 'some uuid'})).returns(message);
      silverBulletMessageSender.publish('log in', {abc: 123}, 'some uuid');
    });
  });

  describe('#resolve', function() {
    it('resolves', function() {
      sandbox.stub(silverBulletMessageBuilder, 'build').withArgs(sinon.match({type: 'response', topic: 'log in', data: {abc: 123}, uuid: 'some uuid'})).returns(message);
      silverBulletMessageSender.resolve('log in', {abc: 123}, 'some uuid');
    });
  });

  describe('#sendReady', function() {
    it('sends ready', function() {
      sandbox.stub(silverBulletMessageBuilder, 'build').withArgs(sinon.match({type: 'ready'})).returns(message);
      silverBulletMessageSender.sendReady();
    });
  });

  describe('#sendBeacon', function() {
    it('sends beacon', function() {
      sandbox.stub(silverBulletMessageBuilder, 'build').withArgs(sinon.match({type: 'beacon'})).returns(message);
      silverBulletMessageSender.sendBeacon();
    });
  });
});
