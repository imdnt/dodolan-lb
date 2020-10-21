'use strict';

module.exports = {
  db: {
    name: 'db',
    connector: 'memory',
  },
  postgres: {
    url: 'postgresql://doadmin:dpo3964zybh284yo@crm-postgresql-do-user-3437594-0.a.db.ondigitalocean.com:25060/mc2cs1?sslmode=require&ssl=true',
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
