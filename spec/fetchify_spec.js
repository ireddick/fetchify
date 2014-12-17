var fetchify = require('../lib/fetchify.js').fetchify

var Protocol = function() {
  this.has = function(key) { return this.hasOwnProperty(key) }
  this.get = function(key) { return this[key] }
}


describe('a fetchified object', function() {

  describe('#fetch', function() {
    it('returns the corresponding value if the key exists', function() {
      var object = fetchify(new Protocol())
      object['key'] = 'value';

      expect(object.fetch('key')).toEqual('value')
    })

    it('throws an exception if the key is missing', function() {
      var object = fetchify(new Protocol())
      var e = new Error('missing key: ' + 'missing')

      expect(function() { object.fetch('missing') }).toThrow(e)
    })

    it('returns the provided value for a missing key', function() {
      var object = fetchify(new Protocol())

      expect(object.fetch('missing', 'provided')).toEqual('provided')
    })

    it('calls the provided function for a missing key', function() {
      var object = fetchify(new Protocol())
      var fn = jasmine.createSpy('fn')

      object.fetch('missing', fn)

      expect(fn.calls.length).toEqual(1)
    })

    it('passes the missing key into the provided function', function() {
      var object = fetchify(new Protocol())

      var value = object.fetch('missing', function(key) { return 'key: ' + key })

      expect(value).toEqual('key: missing')
    })

    it('returns the result of the provided function for a missing key', function() {
      var object = fetchify(new Protocol())

      var value = object.fetch('missing', function() { return 'generatedValue' })

      expect(value).toEqual('generatedValue')
    })

  })

})
