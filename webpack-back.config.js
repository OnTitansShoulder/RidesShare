var nodeExternals = require('webpack-node-externals')
var path = require('path')

module.exports = {
  target: 'node',
  entry: {
    app: ['./server.js']
  },
  output: {
    path: path.resolve(__dirname + '/public'),
    filename: 'bundle-back.js'
  },
  externals: [nodeExternals()]
};
