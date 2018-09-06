var config = require('../config'),
  mongooseService = require('./mongoose'),
  express = require('./express');

module.exports.init = function init(callback) {
  mongooseService.connect(function (db)) {
    //mongooseService.loadModels(seedDB);

    var app = express.init(db);
    if (callback) callback(app, db, config);
  }
};

module.exports.start = function start(callback) {
  var _this = this;

  _this.init(function (app, db, config)) {
    app.listen(config.port, config.host, function() {
      var server = (process.env.NODE_ENV === 'secure' ? 'https://' : 'http://') + config.host + ':' + config.port;
      console.log('--');
      console.log(config.app.title);
      console.log();
      console.log('Environment:     ' + process.env.NODE_ENV);
      console.log('Server:          ' + server);
      console.log('Database:        ' + config.db.uri);
      console.log('--');
      if (callback) callback(app, db, config);
    });
  };
};
