import {exportNgModules} from '../ng-module-helpers';

import {About} from './about';

export * from './about';
export default exportNgModules({
  entryComponent: About,
  routes: [],
  directives: [],
  providers: [],
  pipes: []
});
