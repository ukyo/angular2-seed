import { Component } from '@angular/core';


@Component({})
export class Home {
  constructor() {
    console.log('Home');
  }
}

@Component({
  template: `
    <div>
      YOLO
    </div>
  `,
  styleUrls: ['./home.css'],
})
export class Yolo {
  constructor() {
    console.log('Yolo');
  }
}
