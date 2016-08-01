import {exportNgModules} from './ng-module-helpers';

import aboutModule from './about';
import homeModule from './home';

import { App } from './app';
import { ROUTES, ROUTE_PROVIDERS } from './routes';

export * from './app';
export * from './routes';
export default exportNgModules({
  entryComponent: App,
  ngModules: [
    aboutModule,
    homeModule
  ],
  routes: [
    ...ROUTES
  ],
  directives: [],
  providers: [
    ...ROUTE_PROVIDERS
  ],
  pipes: []
});






