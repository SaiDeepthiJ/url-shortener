const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: './handler.js',
  target: 'node',
  externals: [nodeExternals()], // Exclude node_modules
  output: {
    path: path.resolve(__dirname, '.webpack'),
    filename: 'handler.js',
  },
  mode: 'production',
};
