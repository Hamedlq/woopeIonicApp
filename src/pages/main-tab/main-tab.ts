import { Component } from '@angular/core';
import { NavController, NavParams, App } from 'ionic-angular';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { serverUrl } from '../../Globals';
import { StorePage } from '../store-page/store-page';
import { ListTypes } from './ListTypes';
import { StoreTabPage } from '../store-tab/store-tab';
import { GiftPage } from '../gift/gift';
import { contactUsPage } from '../ContactUS/ContactUS';
import { SearchTabPage } from '../search-tab/search-tab';
import { query } from '@angular/animations';
import { DataProvider } from '../../providers/data/data';

@Component({
  selector: 'page-main-tab',
  templateUrl: 'main-tab.html',
})
export class MainTabPage {
  valueSearch: string = '';
  Like: any = "like";
  page: any;
  profile: any;
  baseUrl: any;
  Items: any[];
  Lists: any[];
  ItemList: any[][];
  MallList: any[][];
  MenuList: any[];
  constructor(
    private http: HttpClient,
    public navParams: NavParams,
    public navCtrl: NavController,
    public data: DataProvider,
    public app: App) {
    this.profile = navParams.get('profile');
    this.page = 0;
    this.baseUrl = serverUrl;
    this.ItemList = [];
    this.MallList = [];
    this.Items = [];
    this.Lists = [];

    this.http.request('Post', this.baseUrl + 'api/Branch/GetCategories', { headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded') })
      .subscribe(data => {
        this.MenuList = <any>data;
      });
    this.http.request('Get', this.baseUrl + 'api/Branch/GetMainLists', { headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded') })
      .subscribe(data => {
        this.Lists = <any>data;
        for (let i = 0; i < this.Lists.length; i++) {
          if (this.Lists[i].listType == ListTypes.StoreList) {
            var body = new HttpParams()
              .append('pageNumber', '0')
              .append('countOfList', this.Lists[i].numberPerList)
              .append('listOrder', this.Lists[i].listOrder);
            this.http.request('Post', this.baseUrl + 'api/Store/GetStoresFilter', { body: body, headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded') })
              .subscribe(storedata => {
                let theItems = [];
                this.ItemList[i] = [];
                theItems = <any>storedata;
                for (let j = 0; j < theItems.length; j++) {
                  this.ItemList[i].push(theItems[j]);
                }
              });
          }
          // else if (this.Lists[i].listType == ListTypes.MallList) {
          //   var body = new HttpParams()
          //     .append('pageNumber', '0')
          //     .append('countOfList', this.Lists[i].numberPerList);
          //   var req = this.http.request('Post', this.baseUrl + 'api/Store/GetMallList', { body: body, headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded') })
          //     .subscribe(storedata => {
          //       let theMalls = [];
          //       this.MallList[i] = [];
          //       theMalls = <any>storedata;
          //       for (let j = 0; j < theMalls.length; j++) {
          //         this.MallList[i].push(theMalls[j]);
          //       }
          //     })
          // }
        }
      });
  }
  contactUs() {
    this.app.getRootNav().setRoot(contactUsPage);
  }
  searchBox(ev) {
    this.page = 0;
    var body = new HttpParams().append('pageNumber', this.page).append('query', this.valueSearch);
    this.http.request('Post', this.baseUrl + 'api/Store/FindStorebyPage', { body: body, headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded') })
      .subscribe(data => {
        this.Items = <any>data;
      });
  }
  storeclick(store) {
    this.app.getRootNav().setRoot(StorePage, { store: store, profile: this.profile });
  }

  likeFerst(itam) {
    if (itam.isFollowed == true) {
    }
  };

  like(store, event) {
    var body = new HttpParams().append('branchId', store.storeId);
    this.http.request('Post', this.baseUrl + 'api/Store/FollowStore', { body: body, headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded') })
      .subscribe(data => {
        //console.log(data);
      });
    event.target.classList.toggle('like');
  };

  isStoreList(item) {
    if (item.listType == ListTypes.StoreList) {
      return true;
    }
  }

  getList(k) {
    if (this.ItemList[k] && this.ItemList[k].length > 0) {
      //console.log(this.ItemList[k]);
      let thelist = [];
      for (let j = 0; j < this.ItemList[k].length; j++) {
        thelist.push(this.ItemList[k][j]);
      }
      return this.ItemList[k];
    } else {
      return [];
    }
  }
  // getMallList(k) {
  //   if (this.MallList[k] && this.MallList[k].length > 0) {
  //     //console.log(this.MallList[k]);
  //     let thelist = [];
  //     for (let j = 0; j < this.MallList[k].length; j++) {
  //       thelist.push(this.MallList[k][j]);
  //     }
  //     return this.MallList[k];
  //   } else {
  //     return [];
  //   }
  // }
  openGift() {
    this.app.getRootNav().setRoot(GiftPage);
  }

  showList(item) {
    this.app.getRootNav().setRoot(StoreTabPage, { storelist: item });
  }
  showAll() {
    var theitem: any;
    theitem = { listOrder: 81 };
    this.app.getRootNav().setRoot(StoreTabPage, { storelist: theitem });
  }

  SelectCategory(categoryid) {
    this.data.paramData = categoryid;
    this.navCtrl.parent.select(1);
  }
  // showMall(item) {
  //   var theitem: any;
  //   theitem = { listOrder: 84 ,id:item.id};
  //   this.app.getRootNav().setRoot(StoreTabPage, { storelist: theitem });
  // }

}