wormhole-js
===========

A modern abstraction of cross domain communication via iframes and postMessage.




= Development
Before running npm install




JSON Format
Publish
  {
    __wormhole__: {
      __type__: 'publish',
      __topic__: 'test',
      __data__: '{"blah": 123}'
      __uuid__: 'fasdfasfada-asdf-asdf-asdf-asdfasdf'
    }
  }

Subscribe reply to publish
  {
    __wormhole__: {
      __type__: 'response',
      __data__: '{"blah": 123}',  // return value of subscribe callback json stringified
      __uuid__: 'fasdfasfada-asdf-asdf-asdf-asdfasdf'
    }
  }

