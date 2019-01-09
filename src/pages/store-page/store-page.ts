import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { serverUrl } from '../../Globals';
import { HttpParams, HttpClient } from '@angular/common/http';
import { AlertController } from 'ionic-angular'

@Component({
  selector: 'store-page',
  templateUrl: 'store-page.html'
})
export class StorePage {
  baseUrl: any;
  store: any;
  // this tells the tabs component which Pages
  // should be each tab's root Page
  constructor(public navCtrl: NavController, private http: HttpClient, public navParams: NavParams, private alertCtrl: AlertController) {

    this.store = navParams.get('store');
    this.baseUrl = serverUrl;

  }
  presentAlert() {
    let alert = this.alertCtrl.create({
      title: 'مبلغ پرداختی خود را وارد کنید',
      subTitle: '',
      buttons: ['تایید'],
      cssClass:"myalert",
      inputs: [
        {
          name: 'username',
          placeholder: 'مبلغ به تومان'
        },
      ],
    });
    alert.present();
  }
}
