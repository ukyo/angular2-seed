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
    if (!store || !store.state) return;
    console.log('HMR store', store);
    // restore state
    const newState = Object.assign({}, store);
    this.appStore.setState(store);

    // restore input values
    const inputs = document.querySelectorAll('input');
    if (store.$inputs && inputs.length === store.$inputs.length) {
      store.$inputs.forEach((value, i) => {
        const el = inputs[i];
        el.value = value;
        el.dispatchEvent(new CustomEvent('input', {detail: el.value}));
      });
    }
  }
  hmrOnDestroy(store) {
    const cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
    const currentState = this.appStore.getState();
    Object.assign(store, currentState);
    // recreate elements
    store.disposeOldHosts = createNewHosts(cmpLocation);
    // save input values
    const inputs = document.querySelectorAll('input');
    store.$inputs = [].slice.call(inputs).map(input => input.value);
    // remove styles
    removeNgStyles();
  }
  hmrAfterDestroy(store) {
    // display new elements
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }
}

export function main() {
  return platformBrowserDynamic().bootstrapModule(MainModule);
}

// boot on document ready
bootloader(main);
