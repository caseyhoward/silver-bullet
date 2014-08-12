# wormhole.js #

A modern abstraction of cross domain communication via iframes and postMessage with the goal of simplifying usage, producing fewer bugs, being easy to test, and providing robustness.

## Examples ##

### Simple usage

Main page
```js
  var testWormhole = wormhole.opening('http://iframed-page.com');
  testWormhole.emit('hi').then(function(result) {
    console.log(result);
  });
```

Page being iframed
```js
  var testWormhole = wormhole.open('http://parent-page.com');
  testWormhole.on('hi', function(data, respond) {
    respond('hello there');
  });
```

Logs 'hello there'

## Installation
I haven't added this to npm yet since I will most likely change the name due to another project existing with the same name.

For now, add the following to your package.json:
'wormhole-js': 'caseyhoward/wormhole-js'

And then require it:
```
var wormhole = require('wormhole-js');
```

## Development
You must have the test-server running:
```
  gulp test-server
```

Run tests and build:
```
  bin/build
```
