import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { About } from './about';

export const ROUTER_CONFIG = [
  { path: '', component: About, pathMatch: 'full' }
];

@NgModule({
  declarations: [
    // Components / Directives/ Pipes
    About
  ],
  imports: [
    RouterModule.forChild(ROUTER_CONFIG),
    FormsModule,
    CommonModule
  ]
})
export class AboutModule {
}
