import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

import { LoginPage } from '../login/login';


import { TabsControllerPage } from '../tabs-controller/tabs-controller';
import { serverUrl } from '../../Globals';
import { global } from '@angular/core/src/util';

@Component({
  selector: 'page-splash',
  templateUrl: 'splash.html'
})
export class SplashPage {
  
  data: any;
  timer: any;
  duration: 3000;
  // this tells the tabs component which Pages
  // should be each tab's root Page
  constructor(private http: HttpClient, public navCtrl: NavController) {
    let baseUrl= serverUrl;
    //this.url ;
    // console.log(global.serverUrl);
    clearInterval(this.timer);
    this.timer = setTimeout(function () {
      if (true) {
        http.post(baseUrl+'api/Profile/GetProfile',{})
        .subscribe(data1 => {
            navCtrl.setRoot(TabsControllerPage);
        });
      }
    }, this.duration);
    
    
    
  }
}
