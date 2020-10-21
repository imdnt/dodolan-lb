'use strict';

const path = require('path');
const lodash = require('lodash');
const app = require(path.resolve(__dirname, '../server'));
const models = require(path.resolve(
  __dirname,
  '../model-config.local.js'
));

function autoUpdateAll(dataSourceName) {
  const ds = app.datasources[dataSourceName];

  console.log('Updating Database: ', dataSourceName);
  const tables = [];
  lodash.forEach(models, function(val, key) {
    console.log(key);
    if (val.dataSource === dataSourceName && !val.noMigration) tables.push(key);
  });

  console.log('Updating database with tables ', tables);

  ds.autoupdate(tables, function(err) {
    if (err) throw err;
    
    ds.disconnect();

    console.log('Update done, happy coding :)');

    process.exit();
  });
}

autoUpdateAll('postgres');
// autoUpdateAll('mongoDB');
