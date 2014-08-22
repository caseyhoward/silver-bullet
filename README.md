# Silver Bullet #

A modern abstraction for communication using postMessage.

## Why?
After quite a bit of experience using postMessage, I finally determined it was very painful. So, I decided to write a library. But first I looked around to see if there was already a library that I could use.

I was surprised by number of existing libraries, however, I still didn't find one that I liked. (I'll post a more detailed description of my analysis library in the future). Common problems I found were no tests or insufficient tests, no testability support, lacking features (making you write boilerplate), hard to follow not well structured code, and polluting the global namespace. So, I did what any other programmer would do: I decided to write my own.

## Disclaimer
This project is relatively new and the API could change at any moment. When the API is stable, version 1 will be released.

## Goals
* Easy testability.
* Prevent race conditions.
* Good performance and no memory leaks.
* Cross browser support. (Still not sure what browsers yet, though).
* Provide a clean code base that is easy for other programmers to understand.
* 100% unit test coverage and an integration test for every feature. (Test in multiple browser versions).
* Support "all" package managers and module loaders.
* Promise and callback support. (Promises for sending messages, callbacks for subscribing).
* Support anything that uses postMessage (iframes, windows, web workers)
* Provide easy debugging / logging

## Examples ##

### Simple usage

Main page
```js
  var testSilverBullet = silverBullet.createIframe('http://iframed-page.com');
  testSilverBullet.emit('hi').then(function(result) {
    console.log(result);
  });
```

Page being iframed
```js
  var testSilverBullet = silverBullet.fromParent('http://parent-page.com');
  testSilverBullet.on('hi', function(data, resolve, reject) {
    respond('hello there');
  });

```

### Creating silver bullets

```js
  // Communicate with parent window
  var bullet = silverBullet.fromParent('http://parent-page.com');  // Pass in the origin

  // From an existing iframe
  var bullet = silverBullet.fromIframe('http://iframe-page.com/index.html'); // Pass in the URL

  // Creating a new iframe to communicate with
  var bullet = silverBullet.createIframe('http://iframe-page.com/index.html'); // Pass in the URL
```

### Using silver bullets

#### Sending messages
```js
bullet.emit('say hello', {some: 'data'}).then(function(response) {
  console.log('yay, they responded ' + response);
}).catch(function(rejection) {
  console.log('Ahhh... , ' + rejection);
});
```

#### Subscribing to messages
```js
// Resolve the promise the sender created by calling resolve
bullet.on('say hello', function(data, resolve, reject) {
  resolve('hi');
});

// Resolve the promise the sender created by returning a value
bullet.on('say hello', function(data, resolve, reject) {
  return 'hi';
});

// Reject the promise the sender created by calling reject
bullet.on('say hello', function(data, resolve, reject) {
  reject('you suck');
});

// Reject the promise the sender created by throwing
bullet.on('say hello', function(data, resolve, reject) {
  throw('you suck');
});

Note: If you are going to use the promise returned by emit then you should only ever set up on subscriber for a particular topic.

```

npm install --save silver-bullet

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
