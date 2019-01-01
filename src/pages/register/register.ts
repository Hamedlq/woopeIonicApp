import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { TabsControllerPage } from '../tabs-controller/tabs-controller';
import { ResponseStatus } from '../Enum/enum';
import { ToastController } from 'ionic-angular';

import 'rxjs/add/operator/map';
import { serverUrl } from '../../Globals';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {
  mobile: string;
  password: string;
  username: string;
  // this tells the tabs component which Pages
  // should be each tab's root Page
  constructor(public navCtrl: NavController, private http: HttpClient, private toastCtrl: ToastController) {

  }
  registerUser() {
    let baseUrl = serverUrl;
    var body = new HttpParams()
      .append('username', this.username)
      .append('password', this.password)
      .append('mobile', this.mobile);

    this.http.request('Post', baseUrl + 'api/Account/RegisterApp', { body: body, headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded') })
      .subscribe(data1 => {
        if (data1["status"] == ResponseStatus.Success) {
          this.navCtrl.setRoot(TabsControllerPage);
        } else {
          let toast = this.toastCtrl.create({
            message: data1["message"],
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
