import { Component } from '@angular/core';

/**
 * Generated class for the HorizentalStoreComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
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
