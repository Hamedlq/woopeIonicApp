import { Component } from '@angular/core';
import { NavController, ToastController, Events, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

import { LoginPage } from '../login/login';


import { TabsControllerPage } from '../tabs-controller/tabs-controller';
import { serverUrl } from '../../Globals';
import { GiftPage } from '../gift/gift';
import { ResponseStatus } from '../Enum/enum';
import { global } from '@angular/core/src/util';
import { PayPage } from '../pay/pay';
import { CreditePayCodePage } from '../creditepaycode/creditepaycode';
import { CashPayCodePage } from '../cash-pay-code/cash-pay-code';
import { SplashSelectPage } from '../splash-select/splash-select';
import { EditPage } from '../Edit-Profile/Edit-Profile';
import { TransactionHistoryPage } from '../TransactionHistory/TransactionHistory';

@Component({
  selector: 'page-splash',
  templateUrl: 'splash.html'
})
export class SplashPage {
  State:any;
  data: any;
  timer: any;
  duration: any;
  // this tells the tabs component which Pages
  // should be each tab's root Page
  constructor(private http: HttpClient, public navCtrl: NavController,
    public toastCtrl: ToastController,public events: Events,navParams: NavParams) {

    let baseUrl = serverUrl;
    this.duration = 1000;
    //this.url ;
    clearInterval(this.timer);
    this.timer = setTimeout(function () {
      http.post(baseUrl + 'api/Profile/GetProfile', {})
        .subscribe(data => {
          //console.log(data);
          if (data["status"] == ResponseStatus.Success) {
            
            //navCtrl.push('bank');
            navCtrl.setRoot(TabsControllerPage,{profile:data});
          } else {
            let toast = toastCtrl.create({
              message: 'خطا در شبکه. لطفا دوباره سعی کنید',
              showCloseButton: true,
              closeButtonText: 'تلاش مجدد',
              position: 'bottom'
            });
            toast.onDidDismiss(() => {
              events.publish('splash:refresh');
            });
            toast.present();
          }
        });
    }, this.duration);



  }
}
