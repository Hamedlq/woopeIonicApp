import { Component } from '@angular/core';
import { NavController, ToastController, App } from 'ionic-angular';
import { HttpParams, HttpClient, HttpHeaders } from '@angular/common/http';
import { serverUrl } from '../../Globals';
import { TabsControllerPage } from '../tabs-controller/tabs-controller';
import { RegisterPage } from '../register/register';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-gift',
  templateUrl: 'gift.html'
})
export class GiftPage {
  gift: any;
  logedIn:boolean;
  disableButton;
  // this tells the tabs component which Pages
  // should be each tab's root Page
  constructor(public navCtrl: NavController, private http: HttpClient, private toastCtrl: ToastController,public app: App) {
    this.disableButton=false;
    let accessToken = localStorage.getItem("access_token");
    if(!accessToken){
      this.logedIn=false;
      
    }else{
      this.logedIn=true;
    }
  }
  submitGiftCode() {
    
    this.disableButton=true;
    var body = new HttpParams()
      .append('GiftCode', this.gift);

    this.http.request('Post', serverUrl + 'api/Gift/SubmitGiftCode', { body: body, headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded') })
      .subscribe(data => {
        
        this.disableButton=false;
        let toast = this.toastCtrl.create({
          message: data["message"],
          duration: 10000,
          position: 'bottom'
        });
        toast.onDidDismiss(() => {
          //console.log('Dismissed toast');
        });

        toast.present();
      },onerror=>{this.disableButton=false;});
  }
  backpressed() {
    
    this.app.getRootNav().setRoot(TabsControllerPage);
  }

  goToRegister(params){
    if (!params) params = {};
    this.navCtrl.push(RegisterPage);
  }
  goToLogin(params){
    if (!params) params = {};
    this.navCtrl.push(LoginPage);
  }
}
