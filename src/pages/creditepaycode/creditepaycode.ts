import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'creditepaycode',
  templateUrl: 'creditepaycode.html'
})
export class CreditePayCodePage {
  profile: any;
  // this tells the tabs component which Pages
  // should be each tab's root Page
  constructor(public navCtrl: NavController,navParams: NavParams) {
    
  }
  
}
