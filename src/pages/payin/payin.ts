import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { serverUrl } from '../../Globals';
import { CashPayCodePage } from '../cash-pay-code/cash-pay-code';
import { ResponseStatus } from '../Enum/enum';
import { CreditePayCodePage } from '../creditepaycode/creditepaycode';


@IonicPage({
  name: 'pay',
  segment: 'pay'
})

@Component({
  selector: 'page-payin',
  templateUrl: 'payin.html'
})

export class PayInPage {

  show = false;
  showi = true;
  baseUrl: any;
  productId: any;
  profile: any;
  user: any;
  model: any;
  payListId: any;
  store: any;
  totalPrice: any;
  return_woope: any;
  pay_price: any;
  count: any;
  payPriceValue: any;
  toman_use: any;
  woope_use: any;
  remain_toman: any;
  isOnline: boolean;
  tax: any;
  dataloaded: boolean = false;
  Btntxt: any;
  switch_credit: boolean;
  switch_woope: boolean;
  params: Map<string, string>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: HttpClient) {
    this.dataloaded = false;
    this.baseUrl = serverUrl;

    this.getparams();
    this.profile = {};
    this.store = {};
    if (this.params) {
      this.productId = this.params['productId'];
      this.user = this.params['user'];
      this.totalPrice = this.params['amount'];
      this.count = this.params['count'];

      this.getInfo();
    }
    this.isOnline = true;
  }

  getInfo() {
    var te = new HttpParams()
      .append('productId', this.productId).append('user', this.user).append('totalPrice', this.totalPrice).append('count', this.count);

    this.http.request('Post', serverUrl + 'api/Product/GetPurchaseInfo', { body: te, headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded') })
      .subscribe(data => {
        this.model = <any>data;
        this.profile = {};
        this.store = {};
        this.profile.moneyCredit = this.model.moneyCredit;
        this.profile.woopeCredit = this.model.woopeCredit;
        this.profile.storeName = this.model.storeName;
        this.store.storeId = this.model.storeId;
        this.store.storeName = this.model.storeName;
        this.store.basePrice = this.model.basePrice;
        this.store.returnPoint = this.model.returnPoint;
        this.dataloaded = true;
        this.calculateValues();
      }, onerror => { this.dataloaded = false; });


  }

  getparams() {
    // let category;
    // let id;
    if (document.URL.indexOf("?") > 0) {
      let splitURL = document.URL.split("?");
      let splitParams = splitURL[1].split("&");
      let i: any;
      this.params = new Map<string, string>();
      for (i in splitParams) {
        let singleURLParam = splitParams[i].split('=');
        if (singleURLParam[0] == "category") {
          //  category = singleURLParam[1];
          singleURLParam[1];
        }
        if (singleURLParam[0] == "id") {
          // id = singleURLParam[1];
          singleURLParam[1];
        }
        //   let urlParameter = {
        //   'name': singleURLParam[0],
        //   'value': singleURLParam[1]
        // };
        //this.params: Map<string, string>;

        this.params[singleURLParam[0]] = singleURLParam[1];
        //this.params.push(urlParameter);
      }
    }
  }

  paydraw() {
    this.show = !this.show;
    this.showi = !this.showi;
  }
  cashSelected() {
    this.isOnline = false;
    this.calculateValues();
  }
  onlineSelected() {
    this.isOnline = true;
    this.calculateValues();
  }
  updateItem() {
    this.calculateValues();
  }
  doPay() {
    this.dataloaded = true;
    let pt = "1";
    if (!this.isOnline) {
      pt = "1";
    } else {
      pt = "2";
    }
    var body = new HttpParams()
      .append('Id', this.payListId)
      .append('BranchId', this.store.storeId)
      .append('TotalPrice', this.totalPrice)
      .append('PayType', pt)
      .append('user', this.user)
      .append('SwitchCredit', String(this.switch_credit))
      .append('SwitchWoope', String(this.switch_woope));
    this.http.request('Post', serverUrl + 'api/Transaction/InsertTheUserPayList', { body: body, headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded') })
      .subscribe(data => {
        if (!this.isOnline) {
          this.dataloaded = false;
          //go to cash pay
          this.navCtrl.push(CashPayCodePage, { store: this.store, profile: this.profile, payListId: data["id"] });
        } else {
          //go to credit pay
          this.setNext(data["id"]);
        }
      }, onerror => { this.dataloaded = false; });
  }

  setNext(payListId) {
    this.calculateValues();
    if (this.payPriceValue == 0) {
      this.ConfirmPayment(payListId);
    } else {
      this.GetPayInfo(payListId);
    }
  }

  ConfirmPayment(payListId) {

    this.dataloaded = true;
    var body = new HttpParams()
      .append('user', this.user)
      .append('Id', payListId);
    this.http.request('Post', serverUrl + 'api/Transaction/GetTheConfirmCode', { body: body, headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded') })
      .subscribe(data => {
        this.dataloaded = false;
        if (data["status"] == ResponseStatus.Success) {

          this.navCtrl.push(CreditePayCodePage, { store: this.store, profile: this.profile, code: data["message"] });
        } else {
          this.calculateValues();
        }
      }, onerror => { this.dataloaded = false; });
  }
  GetPayInfo(payListId) {

    this.dataloaded = true;
    var body = new HttpParams()
      .append('user', this.user)
      .append('paylistId', payListId);
    this.http.request('Post', serverUrl + 'api/Pay/GetThePayInfo', { body: body, headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded') })
      .subscribe(data => {

        this.dataloaded = false;

        window.open("http://mywoope.com/api/Pay/GoToBankFromWeb?token=" + data["token"], '_self');
      }, onerror => { this.dataloaded = false; });
  }
  calculateValues() {
    //int selectedId = payType.getCheckedRadioButtonId();
    let rw = 0;
    if (this.store.returnPoint != 0) {
      rw = Math.floor((this.totalPrice) / this.store.basePrice) * this.store.returnPoint;
    }
    this.return_woope = rw;
    if (!this.isOnline) {
      this.pay_price = this.totalPrice;
      this.payPriceValue = this.totalPrice;
      this.Btntxt = "پرداخت (" + this.totalPrice + " تومان)";
      this.toman_use = "0";
      this.woope_use = "0";
      this.remain_toman = "0";
      this.tax = "0";
    } else {
      let alpha = this.totalPrice - this.profile.moneyCredit;
      let beta = this.totalPrice - (this.profile.woopeCredit * 1000);
      let gama = this.totalPrice - this.profile.moneyCredit - (this.profile.woopeCredit * 1000);
      //    long  remainToman=profile.getTomanCredit()-totalprice;
      this.toman_use = "0";
      if (!this.switch_credit && !this.switch_woope) {
        this.pay_price = this.totalPrice;
        this.payPriceValue = this.totalPrice;
        this.Btntxt = "پرداخت (" + this.totalPrice + " تومان)";
        this.toman_use = "0";
        this.woope_use = "0";
        this.remain_toman = "0";
        this.tax = "0";
      }
      if (this.switch_credit && !this.switch_woope) {
        if (alpha == 0) {
          this.pay_price = "0";
          this.payPriceValue = 0;
          this.Btntxt = "پرداخت (" + 0 + " تومان)";
          this.toman_use = this.totalPrice;
          this.woope_use = "0";
          this.remain_toman = "0";
          this.tax = "0";

        } else if (alpha < 0) {
          this.pay_price = "0";
          this.payPriceValue = 0;
          this.Btntxt = "پرداخت (" + 0 + " تومان)";
          this.toman_use = this.totalPrice;
          this.woope_use = "0";
          this.remain_toman = "0";
          this.tax = "0";
        } else if (alpha > 0) {
          this.payPriceValue = alpha;
          this.pay_price = alpha;
          this.Btntxt = "پرداخت (" + alpha + " تومان)";
          this.toman_use = this.profile.moneyCredit;
          this.woope_use = "0";
          this.remain_toman = "0";
          this.tax = "0";
        }
      }
      if (!this.switch_credit && this.switch_woope) {
        if (beta == 0) {
          this.payPriceValue = 0;
          this.pay_price = "0";
          this.Btntxt = "پرداخت (" + "0" + " تومان)";
          this.toman_use = "0";
          this.woope_use = this.profile.woopeCredit;
          this.remain_toman = "0";
          this.tax = "0";

        } else if (beta < 0) {
          let integerPart = Math.ceil(this.totalPrice / 1000);
          let remainder = Math.abs(beta % 1000);
          this.payPriceValue = 0;
          this.pay_price = "0";
          this.Btntxt = "پرداخت (" + "0" + " تومان)";
          this.toman_use = "0";
          this.woope_use = Math.abs(integerPart);
          this.remain_toman = remainder;
          this.tax = "0";

        } else if (beta > 0) {
          this.payPriceValue = beta;
          this.pay_price = beta;
          this.Btntxt = "پرداخت (" + beta + " تومان)";
          this.toman_use = "0";
          this.woope_use = this.profile.woopeCredit;
          this.remain_toman = "0";
          this.tax = "0";
        }
      }
      if (this.switch_credit && this.switch_woope) {
        if (alpha <= 0) {
          this.payPriceValue = 0;
          this.pay_price = "0";
          this.Btntxt = "پرداخت (" + "0" + " تومان)";
          this.toman_use = this.totalPrice;
          this.woope_use = "0";
          this.remain_toman = "0";
          this.tax = "0";

        } else {
          if (gama == 0) {
            this.payPriceValue = 0;
            this.pay_price = "0";
            this.Btntxt = "پرداخت (" + "0" + " تومان)";
            this.toman_use = this.profile.moneyCredit;
            this.woope_use = this.profile.woopeCredit;
            this.remain_toman = "0";
            this.tax = "0";
          } else if (gama > 0) {
            this.payPriceValue = gama;
            this.pay_price = gama;
            this.Btntxt = "پرداخت (" + gama + " تومان)";
            this.toman_use = this.profile.moneyCredit;
            this.woope_use = this.profile.woopeCredit;
            this.remain_toman = "0";
            this.tax = "0";

          } else if (gama < 0) {
            let integerPart = Math.ceil(alpha / 1000);
            let remainder = Math.abs(gama % 1000);
            this.payPriceValue = 0;
            this.pay_price = "0";
            this.Btntxt = "پرداخت (" + "0" + " تومان)";
            this.toman_use = this.profile.moneyCredit;
            this.woope_use = Math.abs(integerPart);
            this.remain_toman = remainder;
            this.tax = "0";
          }
        }
      }
    }
  }


}
