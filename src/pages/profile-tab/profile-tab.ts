import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TransactionHistoryPage } from '../TransactionHistory/TransactionHistory';

@Component({
  selector: 'page-profile-tab',
  templateUrl: 'profile-tab.html'
})
export class ProfileTabPage {
  profile: any;
  // this tells the tabs component which Pages
  // should be each tab's root Page
  constructor(public navCtrl: NavController,navParams: NavParams) {
    this.profile = navParams.get('profile');
  }

  transactionhistory(){
    this.navCtrl.push(TransactionHistoryPage);
  }
  
}
