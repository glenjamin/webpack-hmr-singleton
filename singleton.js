module.exports = function single(module, key, fn) {
  if (!module || !module.hot) {
    return fn();
  }

}
