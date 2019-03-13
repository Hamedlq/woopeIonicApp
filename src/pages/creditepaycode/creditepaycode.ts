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
  store:any;
  constructor(public navCtrl: NavController,navParams: NavParams,public app: App) {
    this.code = navParams.get('code');
    this.store = navParams.get('store');
  }
  
  confirmpayment(){
    this.app.getRootNav().setRoot(TabsControllerPage);
  }

}
