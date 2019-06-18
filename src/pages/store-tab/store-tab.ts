import { Component } from '@angular/core';
import { NavController, NavParams, App } from 'ionic-angular';
import { HttpParams, HttpHeaders, HttpClient } from '@angular/common/http';
import { serverUrl } from '../../Globals';
import { StorePage } from '../store-page/store-page';
import { GiftPage } from '../gift/gift';
import { TabsControllerPage } from '../tabs-controller/tabs-controller';

@Component({
  selector: 'page-store-tab',
  templateUrl: 'store-tab.html'
})
export class StoreTabPage {
  page: any;
  profile: any;
  storelist: any;
  baseUrl: any;
  items = [];
  // this tells the tabs component which Pages
  // should be each tab's root Page
  constructor(public navCtrl: NavController, private http: HttpClient, public navParams: NavParams,
    public app: App) {
    this.profile = navParams.get('profile');
    this.storelist = navParams.get('storelist');
    this.page = 0;
    this.baseUrl = serverUrl;
    var body = new HttpParams()
      .append('MallId', this.storelist.id)
      .append('countOfList', '9')
      .append('listOrder', this.storelist.listOrder)
      .append('pageNumber', "0");
    this.http.request('Post', this.baseUrl + 'api/Store/GetStoresFilter', { body: body, headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded') })
      .subscribe(data => {
        this.items = <any>data;
      });
  }

  // seperateReturnWoope(returnPoint: string) {
  //   returnPoint = returnPoint.toString();
  //   let lenght = returnPoint.length;
  //   let extra = lenght % 3;
  //   let firstdigit: string;
  //   let digit: string;
  //   if (extra != 0) {
  //     firstdigit = returnPoint.substring(0, extra);
  //     digit = firstdigit;
  //     let st = (extra)
  //     let ed = (extra + 3);
  //     for (var i = 0; i < (lenght - extra); i += 3) {
  //       digit += "," + returnPoint.substring((st + i), (ed + i))
  //     }
  //   }
  //   else {
  //     firstdigit = returnPoint.substring(0, 3);
  //     digit = firstdigit;
  //     extra = 3;
  //     let st = (extra)
  //     let ed = (extra + 3);
  //     for (var j = 0; j < (lenght - extra); j += 3) {
  //       digit += "," + returnPoint.substring((st + j), (ed + j));
  //     }
  //   }
  //   return digit;
  // }

  doInfinite(infiniteScroll) {
    this.page++;
    setTimeout(() => {
      var body = new HttpParams()
        .append('MallId', this.storelist.id)
        .append('countOfList', '9')
        .append('listOrder', this.storelist.listOrder)
        .append('pageNumber', this.page);
      this.http.request('Post', this.baseUrl + 'api/Store/GetStoresbyPage', { body: body, headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded') })
        .subscribe(data => {
          let newitems = <any>data;
          if (newitems.length > 1) {
            for (let i = 0; i < newitems.length; i++) {
              this.items.push(newitems[i]);
            }
          }
        });
      infiniteScroll.complete();
    }, 500);
  }
  bannerclick(banner) {
    //let browser = new InAppBrowser(banner.website, '_system');
    window.open(banner.website, '_system');
  }
  storeclick(store) {
    this.app.getRootNav().setRoot(StorePage, { store: store, profile: this.profile });
  }
  openGift() {
    this.app.getRootNav().setRoot(GiftPage);
  }
  like(store, event) {
    var body = new HttpParams().append('branchId', store.storeId);
    this.http.request('Post', this.baseUrl + 'api/Store/FollowStore', { body: body, headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded') })
      .subscribe(data => {
        if (data['info'] == 'true') {
          event.target.classList.toggle('disp');
          document.getElementById('l' + event.target.id.substring(1)).classList.remove('disp')
          document.getElementById('l' + event.target.id.substring(1)).classList.add('like')

          // event.target.classList.remove("dislike");
        }
        else if (data['info'] == 'false') {
          event.target.classList.toggle('disp');
          document.getElementById('d' + event.target.id.substring(1)).classList.remove('disp')
          document.getElementById('d' + event.target.id.substring(1)).classList.add('dislike')
        }
      });
  }
  backpressed() {
    this.app.getRootNav().setRoot(TabsControllerPage);
  }
}
