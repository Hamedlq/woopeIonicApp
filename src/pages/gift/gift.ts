import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-gift',
  templateUrl: 'gift.html'
})
export class GiftPage {
  gift:any;
  // this tells the tabs component which Pages
  // should be each tab's root Page
  constructor(public navCtrl: NavController) {

  }
  giftcode(){
    gift
  }
}
