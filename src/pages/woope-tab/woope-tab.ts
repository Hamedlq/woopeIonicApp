import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { serverUrl } from '../../Globals';
import { HttpParams, HttpClient } from '@angular/common/http';
import { PayPage } from '../pay/pay';

@Component({
  selector: 'page-woope-tab',
  templateUrl: 'woope-tab.html'
})
export class WoopeTabPage {
  baseUrl:any;
  profile:any;
  items = [];
  // this tells the tabs component which Pages
  // should be each tab's root Page
  constructor(public navCtrl: NavController,private http: HttpClient,public navParams: NavParams,) {
    this.baseUrl = serverUrl;
    this.profile = navParams.get('profile');
    this.http.request('Post', this.baseUrl + 'api/Transaction/GetUserAllActivePaylists', {})
      .subscribe(data => {
        console.log(data);
        this.items = <any>data;
      });
  }
  tranclicked(trans){
    let store={storeId:trans.branchId,returnPoint:trans.returnWoope,basePrice:trans.basePrice}
    let payListId=trans.id;
    let amount=trans.totalPrice;
    this.navCtrl.push(PayPage, { store: store, profile: this.profile, amount: amount,payListId:payListId });
  }
}
