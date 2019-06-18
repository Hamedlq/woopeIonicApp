import { Component, ɵConsole } from '@angular/core';
import { NavController, NavParams, App, ModalController } from 'ionic-angular';
import { serverUrl } from '../../Globals';
import { HttpParams, HttpClient, HttpHeaders } from '@angular/common/http';
import { AlertController } from 'ionic-angular'
import { PayPage } from '../pay/pay';
import { TabsControllerPage } from '../tabs-controller/tabs-controller';
import { PostPage } from '../post/post';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { modelGroupProvider } from '@angular/forms/src/directives/ng_model_group';
import { ResponseStatus } from '../Enum/enum';


@Component({
  selector: 'store-page',
  templateUrl: 'store-page.html'
})
export class StorePage {
  isVip: boolean = false;
  store: any;
  giftwoope: string;
  scroll: string = 'null';
  profile: any;
  baseUrl: any;
  ionfo = [];
  pet: string;
  items = [];
  page: any;
  showpay: boolean = false;
  message: string;
  whatsapphref = "whatsapp://send?text=";
  smshref = "sms:''?body=";
  result: any;
  tittle: string = "مبلغ پرداختی خود را وارد کنید";
  // this tells the tabs component which Pages
  // should be each tab's root Page
  constructor(public navCtrl: NavController, private http: HttpClient,
    public navParams: NavParams,
    private alertCtrl: AlertController,
    public app: App,
    private modalC: ModalController, private socialSharing: SocialSharing) {
    this.pet = 'info';
    this.page = 0;
    this.baseUrl = serverUrl;
    this.store = navParams.get('store');
    this.profile = navParams.get('profile');
    if (this.store.categoryId != null) {
      this.store.categoryId.forEach(function (value) {
        if (value == 10) {
          this.isVip = true;
        }
      });
    }

    var body = new HttpParams()
      .append('branchId', this.store.storeId);
    this.http.request('Post', serverUrl + 'api/Store/GetUserStore', { body: body, headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded') })
      .subscribe(data => {
        this.store = data;
        this.showpay = true;
      });
      let accessToken = localStorage.getItem("access_token");
    if(accessToken){
    this.http.post(serverUrl + 'api/Profile/GetProfile', {})
      .subscribe(data => {
        this.profile = data;
      });
    }
    var te = new HttpParams()
      .append('ProductId', 'null').append('branchId', this.store.storeId).append('page', this.page).append('count', '12');
    this.http.get(serverUrl + 'api/Product/GetActiveProduct', { params: te, headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded') })
      .subscribe(data => {
        this.items = <any>data;
      });

  }
  modal() {
    let modal = document.querySelector('.modal');
    modal.classList.add('modal1');
    this.share()
  }
  close() {
    let modal = document.querySelector('.modal');
    modal.classList.remove('modal1');
    modal.classList.add('modal');
    this.message = "";
    this.whatsapphref = "whatsapp://send?text=";
    this.smshref = "sms:''?body=";
  }
  share() {
    var body = new HttpParams().append('BranchId', this.store.storeId);
    this.http.request('Post', this.baseUrl + 'api/Store/ShareStore', { body: body, headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded') })
      .subscribe(data => {
        this.result = data;
        console.log(this.result["status"]);
        this.message = data["message"];
        this.whatsapphref = this.whatsapphref + this.message;

        let whatsapp = document.querySelector('.whatssapp');
        whatsapp.setAttribute("href", this.whatsapphref);

        this.smshref = this.smshref + this.message;
        let sms = document.querySelector('.sms');
        sms.setAttribute("href", this.smshref);
      });
  }
  action() {
    if (this.result["status"] != ResponseStatus.Success) {
      event.preventDefault();
    }
  }
  presentAlert() {
    let alert = this.alertCtrl.create({
      title: this.tittle,
      buttons: [{ 
        text: 'تایید', handler: data => {
          if (data.discount != '') {
            var body = new HttpParams().append('DiscountCode', data.discount).append('BranchId', this.store.storeId);
            this.http.request('Post', this.baseUrl + 'api/Transaction/CheckDiscountCode', { body: body, headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded') })
              .subscribe(info => {
                console.log(info);
                if (info['status'] != ResponseStatus.Success) {
                  this.tittle = info['message'];
                  this.presentAlert();

                }
                else if (info['status'] == ResponseStatus.Success) {
                  this.tittle = "مبلغ پرداختی خود را وارد کنید";
                  this.giftwoope = info['message'];
                  this.navCtrl.push(PayPage, { store: this.store, profile: this.profile, amount: data.amount, discount: data.discount, giftwoope: this.giftwoope });
                }
              });

          }
          else {
            this.tittle = "مبلغ پرداختی خود را وارد کنید";
            this.giftwoope = '0'
            this.navCtrl.push(PayPage, { store: this.store, profile: this.profile, amount: data.amount, discount: data.discount, giftwoope: this.giftwoope });
          }

        }
      }],
      cssClass: "myalert",
      inputs: [
        {
          name: 'amount',
          placeholder: 'مبلغ به تومان'
        },
        {
          name: 'discount',
          placeholder: 'کد تخفیف اختصاصی'
        },
      ]
    });
    alert.present();
  };

  backpressed() {
    this.app.getRootNav().setRoot(TabsControllerPage);
  };
  doInfinite(infiniteScroll) {
    this.scroll = 'topScroll';
    this.page++;
    setTimeout(() => {
      var te = new HttpParams()
        .append('ProductId', 'null').append('branchId', this.store.storeId).append('page', this.page).append('count', '12');
      this.http.get(serverUrl + 'api/Product/GetActiveProduct?', { params: te, headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded') })
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
  };

  doInfiniteTop(infiniteScroll) {
    this.scroll = 'topScroll';
    infiniteScroll.complete();
  };
  storeP(post) {
    this.navCtrl.push(PostPage, { post: post, profile: this.profile });
  };
  order() {
    var te = new HttpParams()
      .append('branchId', this.store.storeId);
    this.http.get(this.baseUrl + 'api/Branch/SaveVIPRequest', { params: te, headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded') })
      .subscribe(data => {
        this.ionfo = <any>data;
        console.log(this.ionfo['message']);
        let modalConfirm = this.modalC.create('ModalConfirmation', { message: this.ionfo['message'] });
        modalConfirm.present();
      });
  };
  fault() {
    console.log(this.store.storeId);
    var param = new HttpParams().append('BranchId', this.store.storeId);
    this.http.get(this.baseUrl + 'api/Branch/NonCooperation', { params: param, headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded') })
      .subscribe(data => {
        this.ionfo = <any>data;
        console.log(data)
        console.log(this.ionfo['message']);
        let modalConfirm = this.modalC.create('ModalConfirmation', { message: this.ionfo['message'] });
        modalConfirm.present();
      });
  };

}
