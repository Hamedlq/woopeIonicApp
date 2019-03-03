import { Component } from '@angular/core';
import { NavController, NavParams, App } from 'ionic-angular';
import { TransactionHistoryPage } from '../TransactionHistory/TransactionHistory';
import {EditPage} from '../Edit-Profile/Edit-Profile';
import {serverUrl} from '../../Globals'
import {HttpClient } from '@angular/common/http';
@Component({
  selector: 'page-profile-tab',
  templateUrl: 'profile-tab.html'
})
export class ProfileTabPage {
  profile: any;
  baseUrl=serverUrl;
  // this tells the tabs component which Pages
  // should be each tab's root Page
  constructor(public app:App ,
    public navCtrl: NavController,
    private http:HttpClient,
    private navParams: NavParams,) {
    this.profile = navParams.get('profile');
  };

  openEditPage(){
    //this.app.getRootNav().setRoot(EditPage);
    this.navCtrl.push(EditPage);
  };
  transactionhistory(){
    this.navCtrl.push(TransactionHistoryPage);
  };
  ionViewWillEnter() {
    this.http.post(serverUrl + 'api/Profile/GetProfile', {})
    .subscribe(data => {
      console.log(data);
      this.profile=data;
    });
  };
};
