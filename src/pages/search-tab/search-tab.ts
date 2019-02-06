import { Component } from '@angular/core';
import { NavController, ToastController, NavParams, ItemSliding, App, Item } from 'ionic-angular';
import { HttpParams, HttpHeaders, HttpClient } from '@angular/common/http';
import { serverUrl } from '../../Globals';
import { StorePage } from '../store-page/store-page';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'page-search-tab',
  templateUrl: 'search-tab.html'
})
export class SearchTabPage {
  valueSearch : string='';
  Like :any="like";
  page: any;
  profile: any;
  baseUrl:any;
  Items = [];
  constructor(
    private http: HttpClient, 
    private toastCtrl: ToastController,
    public navParams: NavParams,
    public navCtrl: NavController,
    public app: App ) {
    this.profile = navParams.get('profile');
    this.page = 0;
    this.baseUrl = serverUrl;
    var body = new HttpParams().append('pageNumber', this.page).append('query',this.valueSearch);
      this.http.request('Post', this.baseUrl + 'api/Store/FindStorebyPage', { body: body, headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded') })
      .subscribe(data => {
      this.Items = <any>data;
      console.log(<any>data);
      });  
  }
  searchBox(ev){
    this.page = 0;
    var body = new HttpParams().append('pageNumber', this.page).append('query',this.valueSearch);
      this.http.request('Post', this.baseUrl + 'api/Store/FindStorebyPage', { body: body, headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded') })
      .subscribe(data => {
      this.Items = <any>data;
      });   
  }
  storeclick(store){
    this.app.getRootNav().setRoot(StorePage, { store: store,profile:this.profile});
  }
  doInfinite(infiniteScroll) {
    this.page++;
    setTimeout(() => {
      var body = new HttpParams()
        .append('pageNumber', this.page);
      this.http.request('Post', this.baseUrl + 'api/Store/FindStorebyPage', { body: body, headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded') })
        .subscribe(data => {
          let newitems=<any>data;
          if(newitems.length>1){
            for (let i = 0; i < newitems.length; i++) {
              this.Items.push( newitems[i]);
            }
          }
        });
      infiniteScroll.complete();
    }, 500);
  };
   likeFerst(itam){
     if(itam.isFollowed==true){
     }
   };

  like(store,event){
      var body = new HttpParams().append('branchId', store.storeId);
      this.http.request('Post', this.baseUrl + 'api/Store/FollowStore', { body: body, headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded') })
      .subscribe(data =>{
        console.log(data);
    });
     event.target.classList.toggle('like');
  };
  ionViewWillEnter() {
    var body = new HttpParams().append('pageNumber', this.page).append('query',this.valueSearch);
      this.http.request('Post', this.baseUrl + 'api/Store/FindStorebyPage', { body: body, headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded') })
      .subscribe(data => {
      this.Items = <any>data;
      console.log(<any>data);
      }); 
  };
}



