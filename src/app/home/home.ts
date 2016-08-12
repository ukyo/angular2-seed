import { Component } from '@angular/core';


@Component({
  selector: 'home',
  template: `
    <div>
    Hello world
    <h1>external home</h1>

    </div>
  `
})
export class Home {
  constructor() {
    console.log('Home');
  }
}

@Component({
  selector: 'yolo',
  template: `
    <div>
      YOLO
    </div>
  `
})
export class Yolo {
  constructor() {
    console.log('Yolo');
  }
}
