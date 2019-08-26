import { Component } from '@angular/core';
import { NavController, ToastController, Events } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { TabsControllerPage } from '../tabs-controller/tabs-controller';
import { serverUrl } from '../../Globals';
import { ResponseStatus } from '../Enum/enum';
import { EarnMoneyPage } from '../earn-money-page/earn-money-page';


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
  constructor(http: HttpClient, public navCtrl: NavController,
    public toastCtrl: ToastController,public events: Events) {

    let baseUrl = serverUrl;
    this.duration = 1000;
    //this.url ;
    clearInterval(this.timer);
    this.timer = setTimeout(function () {
      http.post(baseUrl + 'api/Profile/AndroidVersion', {})
        .subscribe(data => {
          if (data["status"] == ResponseStatus.Success) {
            
            //navCtrl.push('bank');
            navCtrl.setRoot(TabsControllerPage,{profile:data});
            //navCtrl.setRoot(EarnMoneyPage,{profile:data});
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
