var assert = require('assert');

var single = require('..');

function returns(obj) {
  return function() {
    return obj;
  }
}

describe('webpack-hmr-singleton', function() {

  describe("no module", function() {
    it('should just return function result', function() {
      var module = null;
      var obj = {};
      var result = single(module, 'X', returns(obj));
      assert.strictEqual(result, obj);

      var obj2 = {};
      var second = single(module, 'X', returns(obj2));
      assert.strictEqual(second, obj2);
    });
  });

  describe("no HMR", function() {
    it('should just return function result', function() {
      var module = { hot: undefined };
      var obj = {};
      var result = single(module, 'X', returns(obj));
      assert.strictEqual(result, obj);

      var obj2 = {};
      var second = single(module, 'X', returns(obj2));
      assert.strictEqual(second, obj2);
    });
  });

  describe('HMR', function() {
    var module, accept;
    beforeEach(function() {
      accept = false;
      diposals = [];
      module = {
        hot: {
          accept: function() { accept = true; },
          dispose: function(f) { diposals.push(f); },
          apply: function() {
            module.hot.data = {};
            diposals.forEach(function(f) { f(module.hot.data); });
          }
        }
      };
    });
    it('should not accept HMRs', function() {
      single(module, 'X', returns(123));
      assert.equal(accept, false);
    });
    it('should return function result', function() {
      var obj = {};
      var result = single(module, 'X', returns(obj));
      assert.strictEqual(result, obj);
    });
    it('should return same result on second go', function() {
      var f = function() { return { a: 1 }; };
      var first = single(module, 'X', f);

      module.hot.apply();

      var second = single(module, 'X', f);
      assert.strictEqual(first, second);
    });
  });

});
