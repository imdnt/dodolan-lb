'use strict';

function badAuthorization() {
  let err = new Error('BAD_AUTHORIZATION');
  err.status = 401;
  return err;
}


module.exports = {
  badAuthorization
}
