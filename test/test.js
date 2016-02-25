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
    it('should not accept HMRs');
    it('should return function result');
    it('should return same result on second go');
    it('should remember value on dispose');
  });

});
