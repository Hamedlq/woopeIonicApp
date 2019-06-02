import { Component } from '@angular/core';
import { NavController, NavParams, App } from 'ionic-angular';
import { TabsControllerPage } from '../tabs-controller/tabs-controller';
import { serverUrl } from '../../Globals';

@Component({
  selector: 'creditepaycode',
  templateUrl: 'creditepaycode.html'
})
export class CreditePayCodePage {
  profile: any;
  code: any;
  store: any;
  baseUrl = serverUrl;
  constructor(public navCtrl: NavController, navParams: NavParams, public app: App) {
    this.code = navParams.get('code');
    this.store = navParams.get('store');
    this.baseUrl =serverUrl;
  }

  confirmpayment() {
    this.app.getRootNav().setRoot(TabsControllerPage);
  }

}
