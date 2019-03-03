import { Component } from '@angular/core';
import { NavController, Events } from 'ionic-angular';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { TabsControllerPage } from '../tabs-controller/tabs-controller';
import { ResponseStatus } from '../Enum/enum';
import { ToastController } from 'ionic-angular';

import 'rxjs/add/operator/map';
import { serverUrl } from '../../Globals';
import { SmsValidationPage } from '../sms-validation/sms-validation';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {
  mobile: string;
  password: string;
  username: string;
  profile: any;
  // this tells the tabs component which Pages
  // should be each tab's root Page
  constructor(public navCtrl: NavController, private http: HttpClient,
    private toastCtrl: ToastController, public events: Events) {

  }
  registerUser() {
    let baseUrl = serverUrl;
    var body = new HttpParams()
      .append('username', this.username)
      .append('password', this.password)
      .append('mobile', this.mobile);

    this.http.request('Post', baseUrl + 'api/Account/RegisterApp', { body: body, headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded') })
      .subscribe(data => {
        if (data["status"] == ResponseStatus.Success) {
          this.navCtrl.push(SmsValidationPage, { mobile: this.mobile ,password:this.password});
          // var body = new HttpParams() 
          //   .append('username', this.mobile)
          //   .append('password', this.password)
          //   .append('grant_type', "password");
          //   console.log(data);
          // this.http.request('Post', baseUrl + 'connect/token', { body: body, headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded') })
          //   .subscribe(data => {
          //     console.log(data);
          //     console.log(data["access_token"]);
          //     if (data["access_token"]) {
          //       this.events.publish('user:login', data["access_token"]);
          //       this.navCtrl.push(SmsValidationPage, { mobile: this.mobile, password:this.password });
          //     } else {
          //       let toast = this.toastCtrl.create({
          //         message: 'خطا در سرور',
          //         duration: 3000,
          //         position: 'bottom'
          //       });
          //       toast.onDidDismiss(() => {
          //         console.log('Dismissed toast');
          //       });

          //       toast.present();
          //     }
          //   });

          //this.navCtrl.setRoot(TabsControllerPage);
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
        //console.log(data1["status"])
      });
  }

}
