import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { serverUrl } from '../../Globals';
import { CashPayCodePage } from '../cash-pay-code/cash-pay-code';
import { ResponseStatus } from '../Enum/enum';
import { CreditePayCodePage } from '../creditepaycode/creditepaycode';
import { InAppBrowser } from '@ionic-native/in-app-browser';


@Component({
  selector: 'page-pay',
  templateUrl: 'pay.html'
})

export class PayPage {
  disableButton;
  show = false;
  showi = true;
  baseUrl: any;
  profile: any;
  payListId: any;
  store: any;
  totalPrice: any;
  return_woope: any;
  pay_price: any;
  payPriceValue: any;
  toman_use: any;
  woope_use: any;
  remain_toman: any;
  isOnline: boolean;
  tax: any;
  Btntxt: any;
  switch_credit: boolean;
  switch_woope: boolean;
  constructor(public navCtrl: NavController, public navParams: NavParams, private http: HttpClient, private iab: InAppBrowser) {
    this.disableButton=false;
    this.baseUrl = serverUrl;
    this.payListId = navParams.get('payListId');
    this.profile = navParams.get('profile');
    this.store = navParams.get('store');
    this.totalPrice = navParams.get('amount');
    this.isOnline = true;
    this.calculateValues();
    if(this.payListId){
      this.ConfirmPayment(this.payListId);
    }
  }
  paydraw() {
    this.show = !this.show;
    this.showi = !this.showi;
  }
  backpressed(){
    this.navCtrl.pop();
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
    this.disableButton=true;
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
      .append('SwitchCredit', String(this.switch_credit))
      .append('SwitchWoope', String(this.switch_woope));
    this.http.request('Post', serverUrl + 'api/Transaction/InsertUserPayList', { body: body, headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded') })
      .subscribe(data => {
        //console.log(data);
        if (!this.isOnline) {
          this.disableButton=false;
          //go to cash pay
          this.navCtrl.push(CashPayCodePage, { store: this.store, profile: this.profile, payListId: data["id"] });
        } else {
          //go to credit pay
          this.setNext(data["id"]);
        }
      },onerror=>{this.disableButton=false;});
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
    
    this.disableButton=true;
    var body = new HttpParams()
      .append('Id', payListId);
    this.http.request('Post', serverUrl + 'api/Transaction/GetConfirmCode', { body: body, headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded') })
      .subscribe(data => {
        if (data["status"] == ResponseStatus.Success) {
          
        this.disableButton=false;
          this.navCtrl.push(CreditePayCodePage, { store: this.store, profile: this.profile,code:data["message"] });
        } else {
          this.calculateValues();
        }
      },onerror=>{this.disableButton=false;});
  }
  GetPayInfo(payListId) {
    
    this.disableButton=true;
    var body = new HttpParams()
      .append('paylistId', payListId);
    this.http.request('Post', serverUrl + 'api/Pay/GetPayInfo', { body: body, headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded') })
      .subscribe(data => {
        this.disableButton=false;
        //console.log(data);
        // let browser = this.iab.create("http://mywoope.com/api/Pay/GoToBankFromWeb?token="+data["token"]);
        // browser.on('loadstart').subscribe((event: InAppBrowserEvent) => {
        //   var closeUrl = 'app.woope.ir';
        //   if (event.url == closeUrl) {
        //     browser.close();       //This will close InAppBrowser Automatically when closeUrl Started
        //   }
        // });
        //this.iab.create("http://mywoope.com/api/Pay/GoToBankFromWeb?token="+data["token"]);
        window.open("http://mywoope.com/api/Pay/GoToBankFromWeb?token="+data["token"], '_self');
      },onerror=>{this.disableButton=false;});
  }
  calculateValues() {
    //console.log(this.profile);
    //int selectedId = payType.getCheckedRadioButtonId();
    let rw = 0;
    if (this.store.returnPoint != 0) {
      rw = Math.floor((this.totalPrice) / this.store.basePrice) * this.store.returnPoint;
    }
    //console.log(rw);
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
