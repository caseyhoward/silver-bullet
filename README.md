# Silver Bullet #

A modern abstraction of cross domain communication via iframes and postMessage with the goal of simplifying usage, producing fewer bugs, being easy to test, and providing robustness.

## Examples ##

### Simple usage

Main page
```js
  var testSilverBullet = silverBullet.opening('http://iframed-page.com');
  testSilverBullet.emit('hi').then(function(result) {
    console.log(result);
  });
```

Page being iframed
```js
  var testSilverBullet = silverBullet.open('http://parent-page.com');
  testSilverBullet.on('hi', function(data, respond) {
    respond('hello there');
  });
```

Logs 'hello there'

## Installation
I haven't added this to npm yet since I will most likely change the name due to another project existing with the same name.

For now, add the following to your package.json:
npm install --save silverbullet

And then require it:
```
var silverBullet = require('silver-bullet');
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
