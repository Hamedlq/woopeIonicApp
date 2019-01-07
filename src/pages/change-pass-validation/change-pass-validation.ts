import { Component } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { ResponseStatus } from '../Enum/enum';
import { TabsControllerPage } from '../tabs-controller/tabs-controller';
import { serverUrl } from '../../Globals';

@Component({
  selector: 'page-change-pass-validation',
  templateUrl: 'change-pass-validation.html'
})
export class changePassValidationPage {
  code: string;
  password: string;
  mobile: string;
  profile: any;
  // this tells the tabs component which Pages
  // should be each tab's root Page
  constructor(public navCtrl: NavController, private http: HttpClient,
    private toastCtrl: ToastController, public navParams: NavParams
    , public events: Events) {

    let baseUrl = serverUrl;
    this.code = navParams.get('code');
    this.mobile = navParams.get('mobile');

  }

  confirmCode() {
    let baseUrl = serverUrl;
    var body = new HttpParams()
      .append('VerifyCode', this.code)
      .append('Password', this.password)
      .append('Mobile', this.mobile);
    this.http.request('Post', baseUrl + 'api/Account/ConfirmCodeAndUpdate', { body: body, headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded') })
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
                this.navCtrl.push(TabsControllerPage);
              }
            });
        }else{
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
        }
      });
  }
}

