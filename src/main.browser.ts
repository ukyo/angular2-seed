import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { NgModule, ApplicationRef } from '@angular/core';
import { removeNgStyles, createNewHosts, bootloader } from '@angularclass/hmr';

import { App } from './app/app';
import { AppStore } from './app/app-store';
import appModule from './app';

@NgModule({
  bootstrap: [
    App
  ],
  declarations: [
    App
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
    appModule
    // vendors
  ],
  providers: [
    AppStore
  ]
})
class MainModule {
  constructor(public appRef: ApplicationRef, public appStore: AppStore) {}
  hmrOnInit(store) {
    console.log('HMR store', store);
    if (store) {
      let newState = Object.assign({}, store);
      this.appStore.setState(store);
    }
  }
  hmrOnDestroy(store) {
    var cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
    var currentState = this.appStore.getState();
    Object.assign(store, currentState);
    // recreate elements
    store.disposeOldHosts = createNewHosts(cmpLocation)
    // remove styles
    removeNgStyles();
  }
  hmrAfterDestroy(store) {
    // display new elements
    store.disposeOldHosts()
    delete store.disposeOldHosts;
  }
}

export function main() {
  return platformBrowserDynamic().bootstrapModule(MainModule);
}

// boot on document ready
bootloader(main);
