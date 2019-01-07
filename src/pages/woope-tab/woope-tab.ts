import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { serverUrl } from '../../Globals';
import { HttpParams, HttpClient } from '@angular/common/http';

@Component({
  selector: 'page-woope-tab',
  templateUrl: 'woope-tab.html'
})
export class WoopeTabPage {
  baseUrl:any;
  items = [];
  // this tells the tabs component which Pages
  // should be each tab's root Page
  constructor(public navCtrl: NavController,private http: HttpClient,) {
    this.baseUrl = serverUrl;
    
    this.http.request('Post', this.baseUrl + 'api/Transaction/GetUserAllActivePaylists', {})
      .subscribe(data => {
        this.items = <any>data;
      });
  }
  
}
