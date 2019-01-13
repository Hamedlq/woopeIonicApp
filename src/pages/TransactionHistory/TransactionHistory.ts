import { Component } from '@angular/core';
import { NavController, ToastController, App } from 'ionic-angular';
import { HttpParams, HttpClient, HttpHeaders } from '@angular/common/http';
import { serverUrl } from '../../Globals';
import { ResponseStatus } from '../Enum/enum';
import { TabsControllerPage } from '../tabs-controller/tabs-controller';

@Component({
  selector: 'page-TransactionHistory',
  templateUrl: 'TransactionHistory.html'
})
export class TransactionHistoryPage {
  show = false;
  showi = true;
  gift: any;
  // this tells the tabs component which Pages
  // should be each tab's root Page
  constructor(public navCtrl: NavController, private http: HttpClient, private toastCtrl: ToastController, public app: App) {

  }
  paydraw() {
    this.show = !this.show;
    this.showi = !this.showi;
  }
  submitGiftCode() {
    var body = new HttpParams()
      .append('GiftCode', this.gift);

    this.http.request('Post', serverUrl + 'api/Gift/SubmitGiftCode', { body: body, headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded') })
      .subscribe(data => {
        let toast = this.toastCtrl.create({
          message: data["message"],
          duration: 10000,
          position: 'bottom'
        });
        toast.onDidDismiss(() => {
          console.log('Dismissed toast');
        });

        toast.present();
      });
  }
  backpressed() {

    this.app.getRootNav().setRoot(TabsControllerPage);
  }
}
