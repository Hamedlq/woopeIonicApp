import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { serverUrl } from '../../Globals';
import { ResponseStatus } from '../Enum/enum';

/**
 * Generated class for the CashPayCodePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-cash-pay-code',
  templateUrl: 'cash-pay-code.html',
})
export class CashPayCodePage {
  payListId: any;
  code:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,private http: HttpClient,private toastCtrl: ToastController,) {
    this.payListId = navParams.get('payListId');

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CashPayCodePage');
  }
confirmCode(){
  var body = new HttpParams()
      .append('paylistId', this.payListId)
      .append('confirmationCode', this.code);
    this.http.request('Post', serverUrl + 'api/Transaction/SubmitCashConfirmationCode', { body: body, headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded') })
      .subscribe(data => {
        if (data["status"] == ResponseStatus.Success) {
          let toast = this.toastCtrl.create({
            message: data["message"],
            duration: 3000,
            position: 'bottom'
          });
          toast.onDidDismiss(() => {
            console.log('Dismissed toast');
          });

          toast.present();
          this.navCtrl.pop();
      } else {
        let toast = this.toastCtrl.create({
          message: data["message"],
          duration: 3000,
          position: 'bottom'
        });
        toast.onDidDismiss(() => {
          console.log('Dismissed toast');
        });

        toast.present();
      }
        
      });
}
}
