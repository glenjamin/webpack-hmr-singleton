module.exports = function single(module, key, fn) {
  if (!module || !module.hot) {
    return fn();
  }
  var value;
  module.hot.dispose(function(data) {
    data[key] = value;
  })
  if (module.hot.data && key in module.hot.data) {
    value = module.hot.data[key];
  } else {
    value = fn();
  }
  return value;
}
