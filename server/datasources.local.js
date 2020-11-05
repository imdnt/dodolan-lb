'use strict';

module.exports = {
  db: {
    name: 'db',
    connector: 'memory',
  },
  postgres: {
    url: 'postgresql://doadmin:z21144jxil6h2m0n@db-postgresql-sgp1-15799-do-user-3360143-0.b.db.ondigitalocean.com:25060/defaultdb?sslmode=require',
    name: 'postgres',
    connector: 'postgresql',
  },
  emailDS: {
    name: 'emailDS',
    connector: 'mail',
    transports: [{
      type: 'SMTP',
      host: 'smtp.gmail.com',
      secure: true,
      port: 465,
      auth: {
        user: process.env.EMAIL_NAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    }],
  },
};
