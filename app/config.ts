/// <reference path='./app.d.ts' />

function extendDeep(target:Object, toCopy:Object) {
  for (var name in toCopy) {
    if (typeof toCopy[name] === 'object') {
      target[name] = extendDeep(target[name], toCopy[name]);
    } else {
      target[name] = toCopy[name];
    }
  }
  return target;
}

/**
 * raw configuration properties, with local overrides
 */
export var props = require('../config/config.json');
try {
  var configOverrides = require('../config/config_overrides.json');
  extendDeep(props, configOverrides);
} catch (e) {
  // file probably doesn't exist
}

if ('test' === process.env.NODE_ENV) {
  var testOverrides = require('../config/config_test.json');
  extendDeep(props, testOverrides);
}
