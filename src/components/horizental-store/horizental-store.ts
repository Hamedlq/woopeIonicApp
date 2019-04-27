import { Component } from '@angular/core';
@Component({
  selector: 'horizental-store',
  templateUrl: 'horizental-store.html'
})
export class HorizentalStoreComponent {

  text: string;

  constructor() {
    console.log('Hello HorizentalStoreComponent Component');
    this.text = 'Hello World';
  }

}
