var _ = require('lodash'),
  config = require('../config'),
  path = require('path'),
  mongoose = require('mongoose');

// Initialize Mongoose
module.exports.connect = function (callback) {
  mongoose.Promise = config.db.promise;

  var options = _.merge(config.db.options || {}, { useNewUrlParser: true });

  mongoose
    .connect(config.db.uri, options)
    .then(function (connection) {
      // Enabling mongoose debug mode if required
      mongoose.set('debug', config.db.debug);

      // Call callback FN
      if (callback) callback(connection.db);
    })
    .catch(function (err) {
      console.error('Could not connect to MongoDB!');
      console.log(err);
    });

};

module.exports.disconnect = function (cb) {
  mongoose.connection.db
    .close(function (err) {
      console.info('Disconnected from MongoDB.');
      return cb(err);
    });
};
