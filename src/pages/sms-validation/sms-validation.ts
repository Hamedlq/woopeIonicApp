import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
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
  profile: any;
  // this tells the tabs component which Pages
  // should be each tab's root Page
  constructor(public navCtrl: NavController, private http: HttpClient, private toastCtrl: ToastController, public navParams: NavParams) {

    let baseUrl = serverUrl;
    this.mobile = navParams.get('mobile');
    //this.url ;
    console.log(baseUrl);
    http.post(baseUrl + 'api/Profile/GetProfile', {}) 
      .subscribe(data => {
        this.profile = data;
        var body = new HttpParams()
          .append('Mobile', this.profile["mobile"]);
        this.http.request('Post', baseUrl + 'api/Account/SendForgetPassCode', { body: body, headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded') })
          .subscribe(data => {
            let toast = this.toastCtrl.create({
              message: data["message"], 
              duration: 3000,
              position: 'bottom'
            });
            toast.onDidDismiss(() => {
              console.log('Dismissed toast');
            });
            toast.present();
          });
      });
    var body = new HttpParams()
      .append('Mobile', this.mobile);
  }

  confirmCode() {
    let baseUrl = 'http://localhost:8090/';
    var body = new HttpParams()
      .append('Mobile', this.profile["mobile"])
      .append('VerifyCode', this.code);


    this.http.request('Post', baseUrl + 'api/Account/ConfirmCode', { body: body, headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded') })
      .subscribe(data => {
        if (data["status"] == ResponseStatus.Success) {
          this.navCtrl.setRoot(TabsControllerPage);
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
