import { Component } from '@angular/core';
import { NavController, ToastController, NavParams, ItemSliding, App } from 'ionic-angular';
import { HttpParams, HttpHeaders, HttpClient } from '@angular/common/http';
import { serverUrl } from '../../Globals';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { StorePage } from '../store-page/store-page';
import { GiftPage } from '../gift/gift';
import { PayPage } from '../pay/pay';

@Component({
  selector: 'page-store-tab',
  templateUrl: 'store-tab.html'
})
export class StoreTabPage {
  page: any;
  profile: any;
  baseUrl:any;
  items = [];
  // this tells the tabs component which Pages
  // should be each tab's root Page
  constructor(public navCtrl: NavController, private http: HttpClient, 
    private toastCtrl: ToastController, public navParams: NavParams,
    public app: App) {
      this.profile = navParams.get('profile');
    this.page = 0;
    this.baseUrl = serverUrl;
    var body = new HttpParams()
      .append('pageNumber', this.page);
    this.http.request('Post', this.baseUrl + 'api/Store/GetStoresbyPage', { body: body, headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded') })
      .subscribe(data => {
        console.log(data);
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
  bannerclick(banner){
    //let browser = new InAppBrowser(banner.website, '_system');
    window.open(banner.website, '_system');
  }

  storeclick(store){
    this.app.getRootNav().setRoot(StorePage, { store: store,profile:this.profile});
  }

  openGift(){
    this.app.getRootNav().setRoot(GiftPage);
  }
}
