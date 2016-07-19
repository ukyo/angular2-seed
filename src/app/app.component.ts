import {Component} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';


@Component({
  selector: 'home',
  template: 'Home'
})
export class Home {
  constructor() {
  }
}

@Component({
  selector: 'app',
  directives: [
    ...ROUTER_DIRECTIVES
  ],
  template: `
  <navbar>
    <h1>Hello Angular 2 and Webpack 2</h1>
  </navbar>

  <main>
    <a href="#" [routerLink]="['']">Home</a>
    <a href="#" [routerLink]="['about']">About</a>

    <div>Your Content Here</div>
    <router-outlet></router-outlet>

  </main>

  <footer>AngularClass</footer>
  `
})
export class App {
  constructor() {
    console.log('Hello Angular 2 Webpack 2');
  }
}

