'use strict';

const path = require('path');
const lodash = require('lodash');
const app = require(path.resolve(__dirname, '../server'));
var models = require(path.resolve(
  __dirname,
  '../model-config.local.js'
));

function autoMigrateAll(dataSourceName) {
  var ds = app.datasources[dataSourceName];

  console.warn('----------------------------------------------');
  console.warn('[WARNING] This process will drop all your data');
  console.warn('----------------------------------------------');

  const tables = [];
  lodash.forEach(models, function(val, key) {
    if (val.dataSource === dataSourceName && !val.noMigration) {
      tables.push(key);
    };
  });
  console.log('===== Migrating database ', dataSourceName, ' =====');
  console.log('Migrating database with tables ', tables);

  ds.automigrate(tables, function(err) {
    if (err) throw err;

    ds.disconnect();

    console.log('Migration done, happy coding :)');

    process.exit();
  });
}

autoMigrateAll('postgres');
// autoMigrateAll('mongoDB');
