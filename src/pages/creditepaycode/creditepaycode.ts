import { Component } from '@angular/core';
import { NavController, NavParams, App } from 'ionic-angular';
import { TabsControllerPage } from '../tabs-controller/tabs-controller';

@Component({
  selector: 'creditepaycode',
  templateUrl: 'creditepaycode.html'
})
export class CreditePayCodePage {
  profile: any;
  code:any;
  // this tells the tabs component which Pages
  // should be each tab's root Page
  constructor(public navCtrl: NavController,navParams: NavParams,public app: App) {
    this.code = navParams.get('code');
  }
  
  confirmpayment(){
    this.app.getRootNav().setRoot(TabsControllerPage);
  }

}
