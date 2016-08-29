/*
 * README
 * any changes to this file and you have to run `npm run dll` to generate the bundle
 *
 * Polyfills
 * Vendors
 * RxJS
 */

// Polyfills
export function polyfills(opt?: any) {
  return [
    // 'ie-shim',

    'core-js/es6/symbol',
    'core-js/es6/object',
    'core-js/es6/function',
    'core-js/es6/parse-int',
    'core-js/es6/parse-float',
    'core-js/es6/number',
    'core-js/es6/math',
    'core-js/es6/string',
    'core-js/es6/date',
    'core-js/es6/array',
    'core-js/es6/regexp',
    'core-js/es6/map',
    'core-js/es6/set',
    'core-js/es6/weak-map',
    'core-js/es6/weak-set',
    'core-js/es6/typed',
    'core-js/es6/reflect',
    // 'core-js/es6/promise', // problem with firefox
    'core-js/es7/reflect',

    // zone.js
    ...(isDev(opt.ENV) ?
      ['zone.js/dist/zone', 'zone.js/dist/long-stack-trace-zone'] :
      ['zone.js/dist/zone']
    ),

    // typescript helpers
    'ts-helpers',
    // run `npm run dll` if you change this
  ];
}

// Angular 2 and other Vendor imports
export function vendors(opt?: any) {
  return [
    '@angular/platform-browser',
    '@angular/platform-browser-dynamic',
    '@angular/compiler',
    '@angular/router',
    '@angular/forms',
    '@angular/common',
    '@angular/core',
    '@angular/http',

    '@angularclass/form-validators',
    '@angularclass/hmr',
    // run `npm run dll` if you change this
  ];
}

// RxJS
export function rxjs(opt?: any) {
  return [
    'rxjs/Observable',
    'rxjs/Subscription',
    'rxjs/Subject',
    'rxjs/BehaviorSubject',
    'rxjs/add/operator/map',
    'rxjs/add/operator/mergeMap',
    'rxjs/add/operator/distinctUntilChanged',
    // run `npm run dll` if you change this
  ];
}


function isProd(env) { return env.indexOf('production') !== -1; }
function isDev(env) { return env.indexOf('development') !== -1; }
