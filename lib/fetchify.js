var fetchify = function(o) {
  o.fetch = function(key, provided) {
    if (this.has(key)) {
      return this.get(key)
    } else if (arguments.length > 1) {
      return (typeof provided === 'function' ? provided(key) : provided)
    } else {
      throw new Error('missing key: ' + key)
    }
  }

  return o
}


module.exports.fetchify = fetchify
