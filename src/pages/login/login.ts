import { Component } from '@angular/core';
import { NavController, Events } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { TabsControllerPage } from '../tabs-controller/tabs-controller';
import { serverUrl } from '../../Globals';
import { SmsValidationPage } from '../sms-validation/sms-validation';
import { ChangePassPage } from '../change-pass/change-pass';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  password: string;
  username: string;
  
  profile: any;
  // this tells the tabs component which Pages
  // should be each tab's root Page
  constructor(public navCtrl: NavController, private http: HttpClient, 
    private toastCtrl: ToastController,public events: Events) {
  }


  
  loginUser() {
    let baseUrl = serverUrl;

    var body = new HttpParams()
      .append('username', this.username)
      .append('password', this.password)
      .append('grant_type', "password");


    this.http.request('Post', baseUrl + 'connect/token', { body: body, headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded') })
      .subscribe(data => {
        if (data["access_token"]) {
          this.events.publish('user:login',data["access_token"]);
          //check if show sms validation or tabcontroller
          this.http.post(baseUrl + 'api/Profile/GetProfile', {})
          .subscribe(data => {
            this.profile = data;
            if(!this.profile["phoneNumberConfirmed"]){
              this.events.publish('user:notverified');
              this.navCtrl.push(SmsValidationPage,{mobile:this.profile["mobile"],password:this.password});
            }else{
              //this.navCtrl.push(TabsControllerPage);
              this.navCtrl.setRoot(TabsControllerPage);
              //this.navCtrl.popTo(TabsControllerPage);
            }
          });
        } else {
          let toast = this.toastCtrl.create({
            message: "نام کاربری یا رمز عبور نامعتبر!",
            duration: 3000,
            position: 'bottom'
          });
          toast.onDidDismiss(() => {
            ('Dismissed toast');
          });
          toast.present();
        }
      },error=>{
        let toast = this.toastCtrl.create({
          message: "نام کاربری یا رمز عبور نامعتبر!",
          duration: 3000,
          position: 'bottom'
        });
        toast.onDidDismiss(() => {
          ('Dismissed toast');
        });
        toast.present();
      });
  }
  changePass(){
    this.navCtrl.push(ChangePassPage);
  }
}
