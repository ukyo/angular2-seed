/**
 * @author: @AngularClass
 */
const {
  ContextReplacementPlugin,
  HotModuleReplacementPlugin,
  DefinePlugin,
  ProgressPlugin,
  DllReferencePlugin,

  optimize: {
    CommonsChunkPlugin,
    DedupePlugin,
    UglifyJsPlugin
  }

} = require('webpack');
const { ConcatSource } = require('webpack-sources');
const { ForkCheckerPlugin, TsConfigPathsPlugin } = require('awesome-typescript-loader');
const { NgcWebpackPlugin } = require('@ngtools/webpack');
const AssetsPlugin = require('assets-webpack-plugin');
const path = require('path');
const fs = require('fs');

function root(__path = '.') {
  return path.join(__dirname, __path);
}

// type definition for WebpackConfig is defined in webpack.d.ts
function webpackConfig(options: EnvOptions = {}): WebpackConfig {

  const CONSTANTS = {
    AOT: Boolean(options.AOT),
    ENV: JSON.stringify(options.ENV),
    HMR: Boolean(options.HMR),
    PORT: 3000,
    HOST: 'localhost',
    HTTPS: false
  };
  console.log('CONSTANTS', JSON.stringify(CONSTANTS, null, 2));
  const isProd = options.ENV.indexOf('prod') !== -1;

  const DLL = require(root('./src/dll'));
  const polyfills = DLL.polyfills(options);
  const rxjs = DLL.rxjs(options);

  return {
    cache: true,
    // devtool: 'hidden-source-map',
    devtool: 'source-map',
    // devtool: 'cheap-module-eval-source-map',

    entry: {
      main: [].concat(
        polyfills,
        CONSTANTS.AOT ? './src/browser.aot.ts' : './src/browser.jit.ts',
        rxjs
      )
    },

    output: {
      path: root('dist'),
      filename: '[name].bundle.js',
      sourceMapFilename: '[name].map',
      chunkFilename: '[id].chunk.js'
    },

    module: {
      // allowSyntheticDefaultImports for System.import
      loaders: [
        // Support for .ts files.
        {
          test: /(\.ngfactory)?\.ts$/,
          loaders: [
            '@angularclass/hmr-loader?pretty=' + !isProd + '&prod=' + isProd,
            'awesome-typescript-loader',
            '@angularclass/conventions-loader',
          ],
          exclude: [/\.(spec|e2e|d)\.ts$/],
          include: [root('./src')]
        },
        { test: /\.json$/, loader: 'json-loader', include: [root('./src')] },
        { test: /\.html/,  loader: 'raw-loader', include: [root('./src')] },
        { test: /\.css$/,  loader: 'raw-loader', include: [root('./src')] },
      ]

    },


    plugins: [
      new AssetsPlugin({
        path: root('dist'),
        filename: 'webpack-assets.json',
        prettyPrint: true
      }),

      new TsConfigPathsPlugin(/* { tsconfig, compiler } */),
      new ForkCheckerPlugin(),
      new DefinePlugin(CONSTANTS),
      new ProgressPlugin({}),


    ]
    .concat(CONSTANTS.HMR ? [
      new HotModuleReplacementPlugin()
     ] : [])
    .concat(options.SERVER ? [] : [
      new NgcWebpackPlugin({
        project: './ngc-tsconfig.json',
        baseDir: root('.'),
        entryModule: root('./src/main.browser#MainModule')
      })
    ])
    .concat(isProd ? [
      // prod
      new UglifyJsPlugin({
        compress: {
          warnings: false
        }
      }),
      new ContextReplacementPlugin(
        // The (\\|\/) piece accounts for path separators in *nix and Windows
        /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
        root('./src')
      ),
    ] : [
      // dev
      new DllReferencePlugin({
        context: '.',
        manifest: getManifest('vendors'),
      }),
      new DllReferencePlugin({
        context: '.',
        manifest: getManifest('polyfills'),
      }),
    ]),

    resolve: {
      extensions: ['.ts', '.js', '.json'],
      mainFields: ['module', 'jsnext:main', 'main', 'browser'],
      mainFiles: ['index', 'index.ngfactory']
      // unsafeCache: true
    },

    devServer: {
      setup: (app) => {
        // express middleware
        app.get('/', (req, res) => {
          res.sendFile(root('src/index.html'));
        });
        app.get('/dll/*', (req, res) => {
          var files = req.path.split('/');
          var chunk = files[files.length - 1].replace('.js', '');
          if (chunk.split('.').length < 2) {
            res.sendFile(root('dist/dll/' + getDllAssets(chunk)));
          } else {
            res.sendFile(root('dist/dll/' + chunk));
          }
        });
      },
      compress: true,
      contentBase: './src',
      port: CONSTANTS.PORT,
      hot: CONSTANTS.HMR,
      inline: CONSTANTS.HMR,
      historyApiFallback: true,
      host: CONSTANTS.HOST,
      https: CONSTANTS.HTTPS
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



// dll helpers
function getManifest(__path) {
  var __fs = fs || require('fs');
  var manifest = tryDll(() => JSON.parse(__fs.readFileSync(root('./dist/dll/' + __path + '-manifest.json'), 'utf8')
      // TODO(gdi2290): workaround until webpack fixes dll generation
        .replace(/}(.*[\n\r]\s*)}(.*[\n\r]\s*)}"activeExports": \[\]/, '')));
  return manifest;
}
function getDllAssets(chunk) {
  var assets =  tryDll(() => require(root('./dist/dll/webpack-assets.json')));
  // {"vendors":{"js":"vendors.js"},"polyfills":{"js":"polyfills.js"}}
  return assets[chunk]['js'];
}
function getAssets(chunk) {
  var assets =  tryDll(() => require(root('./dist/webpack-assets.json')));
  // {"vendors":{"js":"vendors.js"},"polyfills":{"js":"polyfills.js"}}
  return assets[chunk]['js'];
}
function tryDll(cb) {
  try {
    return cb();
  } catch (e) {
    console.info("Initializing `%s`...", "DLL files");
    var spawn: any = require('cross-spawn');
    spawn.sync("npm", ["run", "dll"], { stdio: "inherit" });
    return cb();
    // throw new Error('Please run `npm run dll` first before building or running the server');
  }
}
