import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
// import { ANGULARCLASS_FORM_VALIDATOR_DIRECTIVES } from '@angularclass/form-validators'
import { App, AppModule } from './app';

@NgModule({
  bootstrap: [
    App
  ],
  declarations: [
    App,
    // ...ANGULARCLASS_FORM_VALIDATOR_DIRECTIVES
  ],
  imports: [
    // Angular 2
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([], {
      useHash: true
    }),
    // app
    AppModule
    // vendors
  ],
  providers: []
})
export class MainModule {}

export function main() {
  return platformBrowserDynamic().bootstrapModule(MainModule);
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
