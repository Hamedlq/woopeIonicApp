import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { serverUrl } from '../../Globals';
import { HttpParams, HttpClient, HttpHeaders } from '@angular/common/http';
import { AlertController } from 'ionic-angular'
import { PayPage } from '../pay/pay';

@Component({
  selector: 'store-page',
  templateUrl: 'store-page.html'
})
export class StorePage {
  store: any;
  profile: any;
  // this tells the tabs component which Pages
  // should be each tab's root Page
  constructor(public navCtrl: NavController, private http: HttpClient, 
    public navParams: NavParams, private alertCtrl: AlertController) {
    this.store = navParams.get('store');
    this.profile = navParams.get('profile');
    var body = new HttpParams()
      .append('branchId',this.store.storeId);
    this.http.request('Post', serverUrl + 'api/Store/GetUserStore', { body: body, headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded') })
      .subscribe(data => {
        this.store = data;
      });
  }
  presentAlert() {
    let alert = this.alertCtrl.create({
      title: 'مبلغ پرداختی خود را وارد کنید',
      subTitle: '<iput/>',
      buttons: [{
        text: 'تایید', handler: data => {
          console.log(data.amount);
          this.navCtrl.push(PayPage, { store: this.store,profile:this.profile,amount:data.amount});
        }
      }],
      cssClass:"myalert",
      inputs: [
        {
          name: 'amount',
          placeholder: 'مبلغ به تومان'
        },
      ],
    });
    alert.present();
  }
}
