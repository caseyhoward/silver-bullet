# wormhole.js #

A modern abstraction of cross domain communication via iframes and postMessage with the goal of simplifying usage, producing fewer bugs, being easy to test, and providing robustness.

## Examples ##

### Simple usage

```js
  var testWormhole = wormhole.open('http://parent-page.com');
  testWormhole.subscribe('hi', function(data, respond) {
    respond('hello there');
  });
```

```js
  var testWormhole = wormhole.opening('http://iframed-page.com');
  testWormhole.publish('hi').then(function(result) {
    console.log(result);
  });
```

Logs 'hello there'

## Installation
TODO: npm install wormhole

## Development
You must have the test-server running:
    gulp test-server

Run tests and build:
    bin/build
