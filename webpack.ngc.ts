import webpackConfig from 'webpack.config';

import 'core-js/es6';
import 'core-js/es7/reflect';
import 'ts-helpers';
// needed to create context for angular2-webpack and resolveNgRoute
/**
 * @author: @AngularClass
 */
const {
  ContextReplacementPlugin,
  HotModuleReplacementPlugin,
  DefinePlugin,
  ProgressPlugin,
  NormalModuleReplacementPlugin,

  optimize: {
    CommonsChunkPlugin,
    DedupePlugin,
    UglifyJsPlugin
  }

} = require('webpack');
const {ForkCheckerPlugin} = require('awesome-typescript-loader');
const ng2webpack = require('angular2-webpack');
const CompressionPlugin = require('compression-webpack-plugin');
const path = require('path');

function root(__path = '.') {
  return path.join(__dirname, __path);
}

// type definition for WebpackConfig at the bottom
function webpackConfig(options: EnvOptions = {}): WebpackConfig {

  const CONSTANTS = {
    'ENV': JSON.stringify(options.ENV),
    'HMR': options.HMR,
    'PORT': 3000,
    'HOST': 'localhost'
  };

  return {
    cache: true,
    // devtool: 'hidden-source-map',
    devtool: 'source-map',
    // devtool: 'cheap-module-eval-source-map',


    entry: {
      polyfills: './src/polyfills.browser',
      vendor:    './src/vendor.browser',
      // main:      './src/main.browser'
      // polyfills: './ngfactory/src/polyfills.browser',
      // vendor:    './ngfactory/src/vendor.browser',
      main:      './ngfactory/src/main.browser.ngfactory'
    },

    output: {
      path: root('dist'),
      filename: '[name].bundle.js',
      sourceMapFilename: '[name].map',
      chunkFilename: '[id].chunk.js'
    },

    module: {
      preLoaders: [ ng2webpack.loaders() ], // fix angular2

      loaders: [
        // Support for .ts files.
        {
          test: /\.ts$/,
          loaders: [
            'awesome-typescript-loader',
            '@angularclass/conventions-loader'
          ],
          exclude: [/\.(spec|e2e|d)\.ts$/]
        },
        { test: /\.json$/, loader: 'json-loader' },
        { test: /\.html/,  loader: 'raw-loader' },
        { test: /\.css$/,  loader: 'raw-loader' },
      ]

    },


    plugins: [
      // fix angular2
      ng2webpack.plugins(root('./src')),
      // end angular2 fix

      // new HotModuleReplacementPlugin(),
      new ForkCheckerPlugin(),
      new CommonsChunkPlugin({ name: ['main', 'vendor', 'polyfills'], minChunks: Infinity }),
      new DefinePlugin(CONSTANTS),
      new ProgressPlugin({}),

      // new NormalModuleReplacementPlugin(
      //   /facade\/async/,
      //   root('node_modules/@angular/core/esm/src/facade/async.js')
      // ),
      // new NormalModuleReplacementPlugin(
      //   /facade\/lang/,
      //   root('node_modules/@angular/core/esm/src/facade/lang.js')
      // ),
      // new NormalModuleReplacementPlugin(
      //   /facade\/base_wrapped_exception/,
      //   root('node_modules/@angular/core/esm/src/facade/base_wrapped_exception.js')
      // ),
      // new NormalModuleReplacementPlugin(
      //   /facade\/collection/,
      //   root('node_modules/@angular/core/esm/src/facade/collection.js')
      // ),
      // new NormalModuleReplacementPlugin(
      //   /facade\/exception_handler/,
      //   root('node_modules/@angular/core/esm/src/facade/exception_handler.js')
      // ),
      // new NormalModuleReplacementPlugin(
      //   /facade\/exceptions/,
      //   root('node_modules/@angular/core/esm/src/facade/exceptions.js')
      // ),
      // new NormalModuleReplacementPlugin(
      //   /facade\/math/,
      //   root('node_modules/@angular/core/esm/src/facade/math.js')
      // ),
      // new NormalModuleReplacementPlugin(
      //   /facade\/promise/,
      //   root('node_modules/@angular/core/esm/src/facade/promise.js')
      // ),


      new UglifyJsPlugin({
        // beautify: true,
        // comments: true,
        // mangle: false,
        //
      //
        beautify: false,
        mangle: { screw_ie8 : true },
        compress: { screw_ie8: true },
        comments: false
      }),

      new CompressionPlugin({
        algorithm: "gzip",
        test: /\.js$|\.html$/,
        threshold: 10240,
        minRatio: 0.8
      }),
      new NormalModuleReplacementPlugin(
        /facade\/async/,
        root('node_modules/@angular/core/src/facade/async.js')
      ),
      new NormalModuleReplacementPlugin(
        /facade\/lang/,
        root('node_modules/@angular/core/src/facade/lang.js')
      ),
      new NormalModuleReplacementPlugin(
        /facade\/base_wrapped_exception/,
        root('node_modules/@angular/core/src/facade/base_wrapped_exception.js')
      ),
      new NormalModuleReplacementPlugin(
        /facade\/collection/,
        root('node_modules/@angular/core/src/facade/collection.js')
      ),
      new NormalModuleReplacementPlugin(
        /facade\/exception_handler/,
        root('node_modules/@angular/core/src/facade/exception_handler.js')
      ),
      new NormalModuleReplacementPlugin(
        /facade\/exceptions/,
        root('node_modules/@angular/core/src/facade/exceptions.js')
      ),
      new NormalModuleReplacementPlugin(
        /facade\/math/,
        root('node_modules/@angular/core/src/facade/math.js')
      ),
      new NormalModuleReplacementPlugin(
        /facade\/promise/,
        root('node_modules/@angular/core/esm/src/facade/promise.js')
      ),
    ],

    resolve: {
      extensions: ['', '.ts', '.js', '.json'],
      alias: {
        // 'rxjs': root('node_modules/rxjs-es'),
        // '@angular/core/src': root('node_modules/@angular/core/esm/src'),
        // '@angular/common/src': root('node_modules/@angular/common/esm/src'),
        // '@angular/forms/src': root('node_modules/@angular/forms/esm/src'),
        // '@angular/http/src': root('node_modules/@angular/http/esm/src'),
        // '@angular/router/src': root('node_modules/@angular/router/esm/src'),
        // '@angular/compiler/src': root('node_modules/@angular/cpmiler/esm/src'),
        // '@angular/platform-browser/src': root('node_modules/@angular/platform-browser/esm/src')
      }
    },

    devServer: {
      contentBase: './src',
      port: CONSTANTS.PORT,
      hot: CONSTANTS.HMR,
      inline: CONSTANTS.HMR,
      historyApiFallback: true
    },

    node: {
      global: 'window',
      process: true,
      Buffer: false,
      crypto: 'empty',
      net: 'empty',
      tls: 'empty',
      dns: 'empty'
    }
  };
}


// Export
module.exports = webpackConfig;


// Types
type Entry = Array<string> | Object;

type Output = Array<string> | {
  path: string,
  filename: string
};

type EnvOptions = any;

interface WebpackConfig {
  cache?: boolean;
  target?: string;
  devtool?: string;
  entry: Entry;
  output: any;
  module?: any;
  // module?: {
  //   loaders?: Array<any>
  // };
  plugins?: Array<any>;
  resolve?: {
    root?: string;
    extensions?: Array<string>;
    alias?: any
  };
  devServer?: {
    contentBase?: string;
    port?: number;
    historyApiFallback?: boolean;
    hot?: boolean;
    inline?: boolean;
  };
  node?: {
    process?: boolean;
    global?: boolean | string;
    Buffer?: boolean;
    crypto?: string | boolean;
    module?: boolean;
    clearImmediate?: boolean;
    setImmediate?: boolean
    clearTimeout?: boolean;
    setTimeout?: boolean;
    net: string | boolean;
    tls: string | boolean;
    dns: string | boolean;
  };
}
