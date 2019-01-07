import { Component } from '@angular/core';
import { NavController, ToastController, Events } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

import { LoginPage } from '../login/login';


import { TabsControllerPage } from '../tabs-controller/tabs-controller';
import { serverUrl } from '../../Globals';
import { GiftPage } from '../gift/gift';
import { ResponseStatus } from '../Enum/enum';

@Component({
  selector: 'page-splash',
  templateUrl: 'splash.html'
})
export class SplashPage {

  data: any;
  timer: any;
  duration: any;
  // this tells the tabs component which Pages
  // should be each tab's root Page
  constructor(private http: HttpClient, public navCtrl: NavController,
    public toastCtrl: ToastController,public events: Events) {
    let baseUrl = serverUrl;
    this.duration = 3000;
    //this.url ;
    clearInterval(this.timer);
    this.timer = setTimeout(function () {
      http.post(baseUrl + 'api/Profile/GetProfile', {})
        .subscribe(data => {
          console.log(data);
          if (data["status"] == ResponseStatus.Success) {

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
