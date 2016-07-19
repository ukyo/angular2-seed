const path = require('path');
const distPath = path.resolve(__dirname, 'dist');
const rootPath = path.resolve(__dirname);
const srcPath = path.join(rootPath, 'src');

/**
 * @author: @AngularClass
 */

let configFn;

// Look in ./config folder for webpack.dev.js
switch (process.env.NODE_ENV) {
  case 'production':
    configFn = require('./config/webpack.prod');
    break;
  case 'test':
  case 'testing':
    configFn = require('./config/webpack.test');
    break;
  case 'development':
  default:
    configFn = require('./config/webpack.dev');
}

module.exports = (options: EnvOptions = {}) => {
  options.distPath = options.distPath || distPath;
  options.rootPath = options.rootPath || rootPath;
  options.srcPath = options.srcPath || srcPath;
  console.log('Env Options: ', JSON.stringify(options, null, 2));
  return configFn(options);
};
