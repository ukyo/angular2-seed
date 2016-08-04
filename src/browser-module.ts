import { PLATFORM_DIRECTIVES, PLATFORM_PIPES } from '@angular/core';
import { RuntimeCompiler } from '@angular/compiler';
import { SystemJsComponentResolver, ComponentResolver } from '@angular/core';


import { ROUTER_DIRECTIVES } from '@angular/router';
import {
  disableDeprecatedForms,
  FORM_DIRECTIVES,
  FORM_PROVIDERS,
  REACTIVE_FORM_DIRECTIVES
} from '@angular/forms';
import { ANGULARCLASS_FORM_VALIDATOR_DIRECTIVES } from '@angularclass/form-validators';


// our App
import appModule from './app';


// providers
const providers = [
  {
    provide: ComponentResolver,
    useFactory: (r) => new SystemJsComponentResolver(r),
    deps: [RuntimeCompiler]
  },

  ...FORM_PROVIDERS,

  ...appModule.providers
];

// pipes
const pipes = [

  ...appModule.pipes
];

// directives

const directives = [
  ...REACTIVE_FORM_DIRECTIVES,
  ...ROUTER_DIRECTIVES,
  ...FORM_DIRECTIVES,

  ...ANGULARCLASS_FORM_VALIDATOR_DIRECTIVES,
  ...appModule.directives
];


// module
export default {
  entryComponent: appModule.entryComponent,
  providers: [
    ...providers,
    { provide: PLATFORM_DIRECTIVES, multi: true, useValue: directives},
    { provide: PLATFORM_PIPES, multi: true, useValue: pipes},
    disableDeprecatedForms(),
  ],
};
