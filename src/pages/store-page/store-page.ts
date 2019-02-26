import { Component, ɵConsole } from '@angular/core';
import { NavController, NavParams, App ,ModalController} from 'ionic-angular';
import { serverUrl } from '../../Globals';
import { HttpParams, HttpClient, HttpHeaders } from '@angular/common/http';
import { AlertController } from 'ionic-angular'
import { PayPage } from '../pay/pay';
import { TabsControllerPage } from '../tabs-controller/tabs-controller';
import {PostPage} from '../post/post';
@Component({
  selector: 'store-page',
  templateUrl: 'store-page.html'
})
export class StorePage {
  isVip:boolean=false;
  store: any;
  scroll: string = 'null';
  profile: any;
  baseUrl: any;
  ionfo=[];
  pet : string;
  items =[];
  page : any;
  // this tells the tabs component which Pages
  // should be each tab's root Page
  constructor(public navCtrl: NavController, private http: HttpClient,
    public navParams: NavParams,
     private alertCtrl: AlertController,
     public app: App,
     private modalC :ModalController) {
      this.pet='info';
      this.page = 0;
    this.baseUrl = serverUrl;
    this.store = navParams.get('store');
    this.profile = navParams.get('profile');

    console.log(this.store.categoryId);
    if (this.store.categoryId != null) {
      this.store.categoryId.forEach(function (value) {
        console.log(value);
        if (value == 10) {
          this.isVip=true;
        }
      }); 
    }
    
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
      this.http.get(serverUrl + 'api/Product/GetActiveProduct',  { params: te, headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded') })
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
  };

  backpressed(){
    this.app.getRootNav().setRoot(TabsControllerPage);
  };
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
  storeP(post){
    this.navCtrl.push(PostPage, {post:post,profile:this.profile});     
};
order(){
  var te = new HttpParams()
  .append('branchId',this.store.storeId);
  this.http.get(this.baseUrl + 'api/Branch/SaveVIPRequest',  { params: te, headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded') })
    .subscribe(data => {
      this.ionfo =<any>data ;
      console.log(this.ionfo['message']);
      let modalConfirm = this.modalC.create('ModalConfirmation', {message: this.ionfo['message']}  );
      modalConfirm.present();
    });
};
fault(){
  console.log(this.store.storeId);
  var param = new HttpParams().append('BranchId', this.store.storeId);
  this.http.get(this.baseUrl+ 'api/Branch/NonCooperation',  { params: param, headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded') })
  .subscribe(data => {
    this.ionfo =<any>data ;
    console.log(data)
    console.log(this.ionfo['message']);
    let modalConfirm = this.modalC.create('ModalConfirmation', {message: this.ionfo['message']});
    modalConfirm.present();
  });
};
};