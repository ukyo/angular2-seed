import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { HomeModule } from './home';
import { HomeModuleNgFactory } from 'ngfactory/src/app/home/index.ngfactory';

export function homeModule(): any {
  if (AOT) {
    return HomeModuleNgFactory
  }
  return HomeModule;
}

export function asyncAboutModule() {
  if (AOT) {
    return System.import('ngfactory/src/app/+about').then(mod => mod.AboutModule);
  }
  return System.import('./+about').then(mod => mod.AboutModule);
}

export const ROUTER_CONFIG = [
  { path: '', loadChildren: homeModule },
  { path: 'about', loadChildren: asyncAboutModule },
];

@NgModule({
  providers: [
  ],
  declarations: [
    // Components / Directives/ Pipes
  ],
  imports: [
    RouterModule.forChild(ROUTER_CONFIG),
  ],
})
export class AppModule {
}
