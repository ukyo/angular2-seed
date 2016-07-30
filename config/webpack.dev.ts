const {
  BasicEvaluatedExpression,
  ConstDependency,
  ContextReplacementPlugin,
  HotModuleReplacementPlugin,
  DefinePlugin,
  optimize: {
    CommonsChunkPlugin,
    DedupePlugin
  }
} = require('webpack');
const ProgressPlugin = require('webpack/lib/ProgressPlugin.js');
const {ForkCheckerPlugin} = require('awesome-typescript-loader');


function webpackConfig(options: EnvOptions = {}): WebpackConfig {

  const CONSTANTS = {
    ENV: JSON.stringify(options.ENV),
    HMR: options.HMR,
    PORT: 3000,
    HOST: 'localhost'
  };

  return {
    cache: false,
    // devtool: 'hidden-source-map',
    devtool: 'source-map',
    // devtool: 'cheap-module-eval-source-map',


    entry: {
      polyfills: './src/polyfills',
      vendor:    './src/vendor',
      main:      './src/main.browser'
    },

    output: {
      path: options.distPath,
      filename: '[name].bundle.js',
      sourceMapFilename: '[name].map',
      chunkFilename: '[id].chunk.js'
    },

    module: {

      // Start AngularSystemJS
      exprContextRequest: options.srcPath, // full path to your ./src
      exprContextRegExp: /.*\.ts/, // provide better regexp
      exprContextCritical: false,
      preLoaders: [
        {
          test: /systemjs_component_resolver\.js$/,
          loader: 'string-replace-loader',
          query: {
            search: 'lang_1\\.global.*[\\n\\r]\\s*\\.System.import',
            replace: 'System.import',
            flags: 'g'
          }
        },
        { test: /\.d\.ts$/, loader: 'ignore-loader' },
      ],
      // End AngularSystemJS

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
      new HotModuleReplacementPlugin(),
      new ForkCheckerPlugin(),
      new CommonsChunkPlugin({ name: ['main', 'vendor', 'polyfills'], minChunks: Infinity }),
      new DefinePlugin(CONSTANTS),
      new ProgressPlugin({})
    ],

    resolve: {
      extensions: ['', '.ts', '.js', '.json'],
    },

    devServer: {
      contentBase: './src',
      port: CONSTANTS.PORT,
      hot: CONSTANTS.HMR,
      inline: CONSTANTS.HMR,
      historyApiFallback: true
    },

    node: {
      global: true,
      process: true,
      Buffer: false,
      crypto: 'empty',
      module: false,
      clearImmediate: false,
      setImmediate: false,
      clearTimeout: true,
      setTimeout: true
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
    global?: boolean;
    Buffer?: boolean;
    crypto?: string | boolean;
    module?: boolean;
    clearImmediate?: boolean;
    setImmediate?: boolean
    clearTimeout?: boolean;
    setTimeout?: boolean
  };
}
