import {bootstrap} from '@angular/platform-browser-dynamic';
import {provideRouter} from '@angular/router';
import {App, Home} from './app/app.component';

import {RuntimeCompiler} from '@angular/compiler';
import {SystemJsComponentResolver, SystemJsCmpFactoryResolver, ComponentResolver} from '@angular/core';

var routes = [
  { path: '', component: Home},
  { path: 'about', component: './app/about.ts#About'}
]
// Angular 2
export function main() {
  return bootstrap(App, [
    provideRouter(routes),
    {
      provide: ComponentResolver,
      useFactory: (r) => new SystemJsComponentResolver(r),
      // useFactory: () => new SystemJsCmpFactoryResolver(),
      deps: [RuntimeCompiler]
    }
  ]);
}











// Hot Module Replacement

export function bootstrapDomReady() {
  // bootstrap after document is ready
  document.addEventListener('DOMContentLoaded', main);
}

if ('development' === ENV && HMR) {
  // activate hot module reload
  if (document.readyState === 'complete') {
    main();
  } else {
    bootstrapDomReady();
  }
  module.hot.accept();
} else {
  bootstrapDomReady();
}
