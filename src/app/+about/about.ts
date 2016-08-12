import { Component } from '@angular/core';

@Component({
  selector: 'about',
  template: `
    <h2>About</h2>

    <form #form="ngForm" (ngSubmit)="onSubmit(form.value, form)" novalidate>
      <div>
        <label>
          <input
            #inputEmail="ngModel"
            name="inputEmail"
            [(ngModel)]="localState.email"
            ac-is-email
          >
        </label>
      </div>

        Please use a valid email address

      <button>Submit</button>

    </form>
  `
})
export class About {
  localState = {
    email: ''
  };
  constructor() {
  }

  onSubmit(value, form) {
    if (form.valid) {
      console.log('form value', value);
    } else {
      console.log('form invalid');
    }
  }
}
