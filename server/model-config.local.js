'use strict';

const path = require('path');
const modelResolver = require('./libs/modelResolver');

// Setup model datasources
const mainDS = 'postgres';
const emailDS = 'emailDS';
const localDS = 'db';

// Resolve Model
var modelSources = [
  'loopback/common/models',
  'loopback/server/models',
  '../common/models',
  './models',
].concat(modelResolver([path.resolve(__dirname, '../common/models')]));

const mixinSources = [
  'loopback/common/mixins',
  'loopback/server/mixins',
  '../common/mixins',
  '../node_modules/loopback-softdelete',
  './mixins',
];

// Setup model
module.exports = {
  _meta: {
    sources: modelSources,
    mixins: mixinSources,
  },
  User: {
    dataSource: mainDS,
    public: false,
    noMigration: true,
  },
  AccessToken: {
    dataSource: mainDS,
    public: false,
  },
  ACL: {
    dataSource: mainDS,
    public: false,
  },
  RoleMapping: {
    dataSource: mainDS,
    public: false,
    options: {
      strictObjectIDCoercion: true,
    }
  },
  Role: {
    dataSource: mainDS,
    public: false,
  },
  Product: {
    dataSource: mainDS,
    public: true,
  },
  Order: {
    dataSource: mainDS,
    public: true,
  },
  Account: {
    dataSource: mainDS,
    public: true,
  },
  blProduct: {
    dataSource: mainDS,
    public: true,
  },
  orderLog: {
    dataSource: mainDS,
    public: true,
  },
  orderStatus: {
    dataSource: mainDS,
    public: true,
  },
  shippingType: {
    dataSource: mainDS,
    public: true,
  },
  tokpedProduct: {
    dataSource: mainDS,
    public: true,
  },
  accountTokped: {
    dataSource: mainDS,
    public: true,
  },
};
