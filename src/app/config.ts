/// <reference path='../../app.d.ts' />

function extendDeep(target: Object, toCopy: Object) {
  for (var name in toCopy) {
    if (typeof toCopy[name] === 'object') {
      target[name] = extendDeep(target[name], toCopy[name]);
    } else {
      target[name] = toCopy[name];
    }
  }
  return target;
}

export var props = require('../../config/config.json');
try {
  var configOverrides = require('../../config/config_overrides.json');
  props = extendDeep(props, configOverrides);
} catch (e) {
  // no override defined
}
