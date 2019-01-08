import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { serverUrl } from '../../Globals';
import { HttpParams, HttpClient } from '@angular/common/http';

@Component({
  selector: 'store-page',
  templateUrl: 'store-page.html'
})
export class StorePage {
  baseUrl:any;
  store : any;
  // this tells the tabs component which Pages
  // should be each tab's root Page
  constructor(public navCtrl: NavController,private http: HttpClient,public navParams: NavParams) {

    this.store = navParams.get('store');
    this.baseUrl = serverUrl;
    
  }
}
