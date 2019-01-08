import { Component } from '@angular/core';
import { NavController, ToastController, NavParams, ItemSliding } from 'ionic-angular';
import { HttpParams, HttpHeaders, HttpClient } from '@angular/common/http';
import { serverUrl } from '../../Globals';

@Component({
  selector: 'page-store-tab',
  templateUrl: 'store-tab.html'
})
export class StoreTabPage {
  page: any;
  baseUrl:any;
  items = [];
  // this tells the tabs component which Pages
  // should be each tab's root Page
  constructor(public navCtrl: NavController, private http: HttpClient, private toastCtrl: ToastController, public navParams: NavParams) {
    this.page = 0;
    this.baseUrl = serverUrl;
    var body = new HttpParams()
      .append('pageNumber', this.page);
    this.http.request('Post', this.baseUrl + 'api/Store/GetStoresbyPage', { body: body, headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded') })
      .subscribe(data => {
        this.items = <any>data;
      });
  }

  doInfinite(infiniteScroll) {
    console.log('Begin async operation');
    this.page++;
    setTimeout(() => {
      var body = new HttpParams()
        .append('pageNumber', this.page);
      this.http.request('Post', this.baseUrl + 'api/Store/GetStoresbyPage', { body: body, headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded') })
        .subscribe(data => {
          let newitems=<any>data;
          console.log(newitems);
          if(newitems.length>1){
            for (let i = 0; i < newitems.length; i++) {
              this.items.push( newitems[i] );
            }
          }
        });
      infiniteScroll.complete();
    }, 500);
  }

}
