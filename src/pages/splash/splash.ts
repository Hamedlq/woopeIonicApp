import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

import { LoginPage } from '../login/login';


import { TabsControllerPage } from '../tabs-controller/tabs-controller';
import { serverUrl } from '../../Globals';
import { GiftPage } from '../gift/gift';

@Component({
  selector: 'page-splash',
  templateUrl: 'splash.html'
})
export class SplashPage {
  
  data: any;
  timer: any;
  duration:any;
  // this tells the tabs component which Pages
  // should be each tab's root Page
  constructor(private http: HttpClient, public navCtrl: NavController) {
    let baseUrl= serverUrl;
    this.duration= 3000;
    //this.url ;
    clearInterval(this.timer);
    this.timer = setTimeout(function () {

        http.post(baseUrl+'api/Profile/GetProfile',{})
        .subscribe(data1 => {
            navCtrl.setRoot(GiftPage);
        });
    }, this.duration);
    
    
    
  }
}
