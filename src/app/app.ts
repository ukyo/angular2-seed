import { Component } from '@angular/core';

@Component({
  selector: 'app',
  template: `
    <navbar>
      <h1>Hello Angular 2 and Webpack 2</h1>
      <a href="#" routerLink="">Home</a>
      <a href="#" routerLink="about">About</a>
    </navbar>

    <main>
      <router-outlet></router-outlet>
    </main>

    <footer>
      AngularClass
    </footer>
  `
})
export class App {
  constructor() {
    console.log('Hello Angular 2 Webpack 2');
  }
}

