var defaultEnvConfig = require('./default');

module.exports = {
  db: {
    uri: process.env.MONGOHQ_URL || process.env.MONGODB_URI || 'mongodb://localhost:27017/ridesshare',
    options: {},
    // Enable mongoose debug mode
    debug: process.env.MONGODB_DEBUG || false
  },
  log: {
    // logging with Morgan - https://github.com/expressjs/morgan
    // Can specify one of 'combined', 'common', 'dev', 'short', 'tiny'
    format: 'dev',
    fileLogger: {
      directoryPath: process.cwd(),
      fileName: 'app.log',
      maxsize: 10485760,
      maxFiles: 2,
      json: false
    }
  },
  app: {
    title: defaultEnvConfig.app.title + ' - Development'
  },
  mailer: {
    from: process.env.MAILER_FROM || 'ridesshare@gmail.com',
    options: {
      service: process.env.MAILER_SERVICE_PROVIDER || 'gmail',
      xoauth2: {
        user: process.env.MAILER_EMAIL_ID || 'ridesshare@gmail.com',
        clientId: process.env.CLIENT_ID || 'clientid',
        clientSecret: process.env.MAILER_CLIENT_SECRET || 'clientsecret',
        refreshToken: process.env.REF_TOKEN || 'refreshToken',
        accessToken: process.env.ACC_TOKEN || 'accessToken'
      }
    }
  },
  livereload: true
};
