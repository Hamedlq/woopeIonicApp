import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { changePassValidationPage } from '../change-pass-validation/change-pass-validation';
import { serverUrl } from '../../Globals';

@Component({
  selector: 'page-forgetpass-sms-validation',
  templateUrl: 'forgetpass-sms-validation.html'
})
export class ForgetPassSmsValidationPage {
  code: string;
  mobile: string;
  // this tells the tabs component which Pages
  // should be each tab's root Page
  constructor(public navCtrl: NavController, private http: HttpClient, private toastCtrl: ToastController, public navParams: NavParams) {

    let baseUrl = serverUrl;
    this.mobile = navParams.get('mobile');
    var body = new HttpParams()
      .append('Mobile', this.mobile);
    this.http.request('Post', baseUrl + 'api/Account/SendForgetPassCode', { body: body, headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded') })
      .subscribe(data => {
        let toast = this.toastCtrl.create({
          message: data["message"],
          duration: 3000,
          position: 'bottom'
        });
        toast.onDidDismiss(() => {
          //console.log('Dismissed toast');
        });
        toast.present();
      });
  }

  confirmCode() {
    this.navCtrl.push(changePassValidationPage, { code: this.code, mobile: this.mobile });
  }
}
