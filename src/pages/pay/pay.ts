import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';


@Component({
  selector: 'page-pay',
  templateUrl: 'pay.html'
})

export class PayPage {
  show = false;
  showi = true;
  constructor(public navCtrl: NavController) {
  }
  paydraw() {
    this.show = !this.show;
    this.showi = !this.showi;
  }

}
