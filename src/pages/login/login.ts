import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { ResponseStatus } from '../Enum/enum';
import { TabsControllerPage } from '../tabs-controller/tabs-controller';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  password: string;
  username: string;
  // this tells the tabs component which Pages
  // should be each tab's root Page
  constructor(public navCtrl: NavController, private http: HttpClient, private toastCtrl: ToastController) {
  }
  

  
  loginUser() {
    let baseUrl = 'http://localhost:8090/';
    var body = new HttpParams()
      .append('username', this.username)
      .append('password', this.password)
      .append('grant_type', "password");


    this.http.request('Post', baseUrl + 'connect/token', { body: body, headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded') })
      .subscribe(data => {
        console.log(data);
        console.log(data["access_token"]);
        if (data["access_token"]) {
          localStorage.setItem("access_token",data["access_token"])
            this.navCtrl.setRoot(TabsControllerPage);
        } else {
          let toast = this.toastCtrl.create({
            message: "نام کاربری یا رمز عبور نامعتبر!",
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
