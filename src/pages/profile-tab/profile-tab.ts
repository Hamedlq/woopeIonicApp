import { Component } from '@angular/core';
import { NavController, NavParams, App } from 'ionic-angular';
import { TransactionHistoryPage } from '../TransactionHistory/TransactionHistory';
import {EditPage} from '../Edit-Profile/Edit-Profile';
@Component({
  selector: 'page-profile-tab',
  templateUrl: 'profile-tab.html'
})
export class ProfileTabPage {
  profile: any;
  // this tells the tabs component which Pages
  // should be each tab's root Page
  constructor(public app:App , public navCtrl: NavController,navParams: NavParams) {
    this.profile = navParams.get('profile');
  };

  openEditPage(){
    //this.app.getRootNav().setRoot(EditPage);
    this.navCtrl.push(EditPage);
  };
  transactionhistory(){
    this.navCtrl.push(TransactionHistoryPage);
  };

  
};
