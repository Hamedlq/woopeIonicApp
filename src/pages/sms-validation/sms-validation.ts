import { Component } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { ResponseStatus } from '../Enum/enum';
import { TabsControllerPage } from '../tabs-controller/tabs-controller';
import { serverUrl } from '../../Globals';

@Component({
  selector: 'page-sms-validation',
  templateUrl: 'sms-validation.html'
})
export class SmsValidationPage {
  code: string;
  mobile: string;
  password: string;
  profile: any;
  IsShowResend: boolean;
  // this tells the tabs component which Pages
  // should be each tab's root Page
  constructor(public navCtrl: NavController, private http: HttpClient, private toastCtrl: ToastController, public navParams: NavParams, public events: Events) {
    this.IsShowResend = false;
    let baseUrl = serverUrl;
    this.mobile = navParams.get('mobile');
    this.password = navParams.get('password');
    setInterval(() => {
      this.IsShowResend = true;
    }, 30000);

    var body = new HttpParams()
      .append('Mobile', this.mobile);
    this.http.request('Post', serverUrl + 'api/Account/SendForgetPassCode', { body: body, headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded') })
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
    let baseUrl = serverUrl;
    var body = new HttpParams()
      .append('Mobile', this.mobile)
      .append('VerifyCode', this.code);

    this.http.request('Post', baseUrl + 'api/Account/ConfirmCode', { body: body, headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded') })
      .subscribe(data => {
        if (data["status"] == ResponseStatus.Success) {
          var body = new HttpParams()
            .append('username', this.mobile)
            .append('password', this.password)
            .append('grant_type', "password");
          this.http.request('Post', baseUrl + 'connect/token', { body: body, headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded') })
            .subscribe(data => {
              if (data["access_token"]) {
                this.events.publish('user:login', data["access_token"]);
                this.navCtrl.setRoot(TabsControllerPage);
              } else {
                let toast = this.toastCtrl.create({
                  message: 'خطا در سرور',
                  duration: 3000,
                  position: 'bottom'
                });
                toast.onDidDismiss(() => {
                  //console.log('Dismissed toast');
                });
                toast.present();
              }
            });
        } else {
          let toast = this.toastCtrl.create({
            message: data["message"],
            duration: 3000,
            position: 'bottom'
          });
          toast.onDidDismiss(() => {
            //console.log('Dismissed toast');
          });

          toast.present();
        }
      });
  }
  resendsms() {
    this.IsShowResend = false;
    setInterval(() => {
      this.IsShowResend = true;
    }, 30000);
    var body = new HttpParams()
      .append('Mobile', this.mobile);
    this.http.request('Post', serverUrl + 'api/Account/SendForgetPassCode', { body: body, headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded') })
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
}
