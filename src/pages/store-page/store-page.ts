import { Component, ɵConsole } from '@angular/core';
import { NavController, NavParams, App } from 'ionic-angular';
import { serverUrl } from '../../Globals';
import { HttpParams, HttpClient, HttpHeaders } from '@angular/common/http';
import { AlertController } from 'ionic-angular'
import { PayPage } from '../pay/pay';
import { TabsControllerPage } from '../tabs-controller/tabs-controller';

@Component({
  selector: 'store-page',
  templateUrl: 'store-page.html'
})
export class StorePage {

  store: any;
  scroll: string = 'null';
  profile: any;
  baseUrl: any;
  pet : string;
  items =[];
  page : any;
  // this tells the tabs component which Pages
  // should be each tab's root Page
  constructor(public navCtrl: NavController, private http: HttpClient,
    public navParams: NavParams, private alertCtrl: AlertController,public app: App) {
      this.pet='info';
      this.page = 0;
    this.baseUrl = serverUrl;
    this.store = navParams.get('store');
    this.profile = navParams.get('profile');
    var body = new HttpParams()
      .append('branchId', this.store.storeId);
    this.http.request('Post', serverUrl + 'api/Store/GetUserStore', { body: body, headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded') })
      .subscribe(data => {
        this.store = data;
      });
      this.http.post(serverUrl + 'api/Profile/GetProfile', {})
      .subscribe(data => {
        this.profile=data;
      });
      var te = new HttpParams()
      .append('ProductId', 'null').append('branchId' ,this.store.storeId).append('page' ,this.page).append('count' ,'12');
      this.http.get(serverUrl + 'api/Product/GetActiveProduct?',  { params: te, headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded') })
      .subscribe(data => {
        this.items = <any>data;
        console.log(this.items);
      });
      
  }
  presentAlert() {
    let alert = this.alertCtrl.create({
      title: 'مبلغ پرداختی خود را وارد کنید',
      buttons: [{
        text: 'تایید', handler: data => {
          console.log(data.amount);
          this.navCtrl.push(PayPage, { store: this.store, profile: this.profile, amount: data.amount });
        }
      }],
      cssClass: "myalert",
      inputs: [
        {
          name: 'amount',
          placeholder: 'مبلغ به تومان'
        },
      ],
    });
    alert.present();
  }

  backpressed(){
    this.app.getRootNav().setRoot(TabsControllerPage);
  }
  doInfinite(infiniteScroll) {
    this.scroll='topScroll';
    this.page++;
    console.log(this.page);
    setTimeout(() => {
      var te = new HttpParams()
      .append('ProductId', 'null').append('branchId' ,this.store.storeId).append('page' ,this.page).append('count' ,'12');
      this.http.get(serverUrl + 'api/Product/GetActiveProduct?',  { params: te, headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded') })
        .subscribe(data => {
          let newitems=<any>data;
          if(newitems.length>1){
            for (let i = 0; i < newitems.length; i++) {
              this.items.push( newitems[i]);
            }
          }
        });
      infiniteScroll.complete();
    }, 500);
  };
  
  doInfiniteTop(infiniteScroll) {
    this.scroll='topScroll';
    console.log('ok');
    infiniteScroll.complete();
  };

}
