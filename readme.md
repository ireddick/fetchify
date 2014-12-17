# fetchify

adds a flexible fetch method to objects that support key/value operations


## requirements

objects currently must support the following protocol:

* has(key) - must return a boolean indicating presence of the key

* get(key) - must return the value associated with the key

the methods are called in the order has -> get

(these are deliberately the same names as those in the ES6 Map)


## usage example

```javascript
require('fetchify').fetchify(Map.prototype) // serious monkey patch!


var map = new Map()

map.set('key', 'value')

map.fetch('key') // => value

map.fetch('missing key') // => throws missing key Error

map.fetch('missing key', 'provided value') // => provided value

map.fetch('missing key', function(key) { return 'result' }) // => result

map.fetch('missing key', function(key) { throw 'meaningful error message' })
```
