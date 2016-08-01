import {exportNgModules} from '../ng-module-helpers';

import {Home} from './home';

export * from './home';
export default exportNgModules({
  entryComponent: Home,
  routes: [],
  directives: [],
  providers: [],
  pipes: []
});
