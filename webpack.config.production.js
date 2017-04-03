var config = require('./webpack.config.development.js');
config.entry.app.shift();
config.plugins.shift();
config.output.publicPath = './built/';
module.exports = config;
