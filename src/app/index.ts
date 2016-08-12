import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { HomeModule, Home } from './home';
export { App } from './app';

export const ROUTER_CONFIG = [
  { path: '', component: Home, pathMatch: 'full' },
  { path: 'about', loadChildren: './+about' },
];

@NgModule({
  providers: [
  ],
  declarations: [
    // Components / Directives/ Pipes
    Home,
  ],
  imports: [
    RouterModule.forChild(ROUTER_CONFIG),
    HomeModule,
  ],
})
export class AppModule {
  static routes = ROUTER_CONFIG
}

export default AppModule
