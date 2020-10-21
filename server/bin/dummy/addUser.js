'use strict';

var path = require('path');
var app = require(path.resolve(__dirname, '../../server'));
console.log('masuk>????');

module.exports = addDummyUser => {
  console.log('masuk?');
  app.models.User.create([
    {
      'username': 'irwinpratajaya',
    	'email': 'irwin@gmail.com',
    	'firstname': 'irwin',
    	'lastname': 'pratajaya',
    	'phoneNumber': '0888000000',
    	'gender': 'male',
    	'dateOfBirth': '03-21-1989',
    	'address': 'bintaro',
    	'userType': 'influencer',
    	'verified': false,
    	'password': '123',
    },
    {
      'username': 'bambang',
    	'email': 'bambang@gmail.com',
    	'firstname': 'irwin',
    	'lastname': 'pratajaya',
    	'phoneNumber': '0888000001',
    	'gender': 'male',
    	'dateOfBirth': '03-21-1988',
    	'address': 'bogor',
    	'userType': 'influencer',
    	'verified': false,
    	'password': '123',
    },
    {
      'username': 'dante',
    	'email': 'dante@gmail.com',
    	'firstname': 'daniel',
    	'lastname': 'dante',
    	'phoneNumber': '0888000003',
    	'gender': 'male',
    	'dateOfBirth': '03-21-1990',
    	'address': 'kuningan',
    	'userType': 'influencer',
    	'verified': false,
    	'password': '123',
    },
  ], (err) => {
    if (err) throw err;
    console.log('Create User');
  });
};

// addDummyUser();
