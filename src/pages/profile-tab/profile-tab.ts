import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { IonicNativePlugin } from '@ionic-native/core/ionic-native-plugin';
import { Crop } from '@ionic-native/crop';

@Component({
  selector: 'page-profile-tab',
  templateUrl: 'profile-tab.html'
})
export class ProfileTabPage {
  profile: any;
  constructor(public navCtrl: NavController, navParams: NavParams) {
    this.profile = navParams.get('profile');
  }
  

  transactionhistory() {
  }

}
