import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, App } from 'ionic-angular';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { serverUrl } from '../../Globals';
import { StorePage } from '../store-page/store-page';
import { ListTypes } from './ListTypes';
import { StoreTabPage } from '../store-tab/store-tab';
import { GiftPage } from '../gift/gift';

@Component({
  selector: 'page-main-tab',
  templateUrl: 'main-tab.html',
})
export class MainTabPage {
  valueSearch : string='';
  Like :any="like";
  page: any;
  profile: any;
  baseUrl:any;
  Items : any[];
  Lists :any[];
  ItemList:any[][];
  constructor(
    private http: HttpClient, 
    private toastCtrl: ToastController,
    public navParams: NavParams,
    public navCtrl: NavController,
    public app: App ) {
    this.profile = navParams.get('profile');
    this.page = 0;
    this.baseUrl = serverUrl;
    this.ItemList= [];
    this.Items=[];
    this.Lists =[];
    
      this.http.request('Get', this.baseUrl + 'api/Branch/GetMainLists', {headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded') })
      .subscribe(data => {
      this.Lists = <any>data;
      for(let i = 0; i < this.Lists.length; i++){
         var body = new HttpParams()
        .append('pageNumber', '0')
        .append('countOfList', this.Lists[i].numberPerList)
        .append('listOrder',this.Lists[i].listOrder);
      var req = this.http.request('Post', this.baseUrl + 'api/Store/GetStoresFilter', { body: body, headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded') })
      .subscribe(storedata => {
        let theItems=[];
        this.ItemList[i]=[];
        theItems = <any>storedata; 
        for(let j = 0; j < theItems.length; j++){ 
          this.ItemList[i].push(theItems[j]);
        }
      });
      } 
     
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
  
  isStoreList(item){
    if(item.listType == ListTypes.StoreList){
      return true;
    }
  }
  getList(k){
    if(this.ItemList[k] && this.ItemList[k].length>0){
      console.log(this.ItemList[k]);
      let thelist = [];
      for(let j = 0; j < this.ItemList[k].length; j++){ 
        thelist.push(this.ItemList[k][j]);
      }
      return this.ItemList[k];
    }else{
      return [];
    }
  }
  openGift(){
    this.app.getRootNav().setRoot(GiftPage);
  }
  showList(item){
    this.app.getRootNav().setRoot(StoreTabPage, { storelist: item});
  }
  showAll(){
    var theitem:any;
    theitem= {listOrder : 81};
    this.app.getRootNav().setRoot(StoreTabPage, { storelist: theitem});
  }

}