import { Component } from '@angular/core';
import { NavController, NavParams, App } from 'ionic-angular';
import { serverUrl } from '../../Globals';
import { TabsControllerPage } from '../tabs-controller/tabs-controller';

@Component({
  selector: 'page-cash-pay-code',
  templateUrl: 'cash-pay-code.html',
})
export class CashPayCodePage {
  payListId: any;
  code: any;
  store: any;
  baseUrl = serverUrl;
  logo: any;

  disableButton;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public app: App) {
    this.payListId = navParams.get('payListId');
    this.store = navParams.get('store');
    this.disableButton = false;
    this.baseUrl = serverUrl;
  }

  // confirmCode(){
  //   this.disableButton=true;
  //   var body = new HttpParams()
  //       .append('paylistId', this.payListId)
  //       .append('confirmationCode', this.code);
  //     this.http.request('Post', serverUrl + 'api/Transaction/SubmitCashConfirmationCode', { body: body, headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded') })
  //       .subscribe(data => {
  //         this.disableButton=false;
  //         if (data["status"] == ResponseStatus.Success) {
  //           let toast = this.toastCtrl.create({
  //             message: data["message"],
  //             duration: 3000,
  //             position: 'bottom'
  //           });
  //           toast.onDidDismiss(() => {
  //             //console.log('Dismissed toast');
  //           });

  //           toast.present();
  //           //this.navCtrl.pop();
  //           this.navCtrl.setRoot(TabsControllerPage);
  //       } else {
  //         let toast = this.toastCtrl.create({
  //           message: data["message"],
  //           duration: 3000,
  //           position: 'bottom'
  //         });
  //         toast.onDidDismiss(() => {
  //           //console.log('Dismissed toast');
  //         });

  //         toast.present();
  //       }

  //       },onerror=>{this.disableButton=false;});
  // }
  confirmCode() {
    this.app.getRootNav().setRoot(TabsControllerPage);
  }
}
