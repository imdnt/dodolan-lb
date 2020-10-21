'use strict';

const path = require('path');
const {lstatSync, readdirSync} = require('fs');
const COMPONENT_NAME = 'Model Resolver';

module.exports = function modelResolver(sources) {
  sources = Array.isArray(sources) ? sources : [sources];

  const isDirectory = source => lstatSync(source).isDirectory();
  const getDirectories = source =>
    readdirSync(source)
      .map(name => path.join(source, name)).filter(isDirectory);

  var result = [];

  sources.forEach(function(source) {
    result = result.concat(getDirectories(source));
  });

  return result;
};
