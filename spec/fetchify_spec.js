var fetchify = require('../lib/fetchify.js').fetchify

var objectWithProtocol = function() {
  return {
    has: function(key) { return this.hasOwnProperty(key) },
    get: function(key) { return this[key] },
  }
}


describe('a fetchified object', function() {

  var object

  beforeEach(function() {
    object = fetchify(objectWithProtocol())
  })

  describe('#fetch', function() {
    it('returns the corresponding value if the key exists', function() {
      object['key'] = 'value';

      expect(object.fetch('key')).toEqual('value')
    })

    it('throws an exception if the key is missing', function() {
      var e = new Error('missing key: ' + 'missing')

      expect(function() { object.fetch('missing') }).toThrow(e)
    })

    it('returns the provided value for a missing key', function() {
      expect(object.fetch('missing', 'provided')).toEqual('provided')
    })

    it('calls the provided function for a missing key', function() {
      var fn = jasmine.createSpy('fn')

      object.fetch('missing', fn)

      expect(fn.calls.length).toEqual(1)
    })

    it('passes the missing key into the provided function', function() {
      var value = object.fetch('missing', function(key) { return 'key: ' + key })

      expect(value).toEqual('key: missing')
    })

    it('returns the result of the provided function for a missing key', function() {
      var value = object.fetch('missing', function() { return 'generatedValue' })

      expect(value).toEqual('generatedValue')
    })

  })

})
