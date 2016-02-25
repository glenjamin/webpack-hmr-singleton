# Webpack HMR Singleton

Utility lib to help define a hot-reloadable singleton

If you want something fancier, you might want to try [ud](https://www.npmjs.com/package/ud). This goal of this lib is to remain very small in scope, bytes and dependencies.

## Install

```sh
npm install webpack-hmr-singleton
```

## Usage

```js
var single = require('webpack-hmr-singleton');

var thing = single(module, 'thing', function() {
  return { anything: ['you', 'want'] };
});
```

On the first run, the function will be called and `single` will return the object you've specified. After every hot reload the function won't be called and you'll just get the first one back again.

This is only really useful if the value is something mutable, that you modify during the running of your program, and want it to stick around after a hot reload.

## Docs

### single(module, key, fn)

* `module` - The CommonJS module object
* `key` - A key to identify this item, must be unique per module
* `fn` - A function that will return the object to singleton.

## License

Copyright 2016 Glen Mailer.

MIT Licened.
