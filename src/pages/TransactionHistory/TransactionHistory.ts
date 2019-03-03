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
  items = [];
  
  constructor(public navCtrl: NavController, private http: HttpClient, private toastCtrl: ToastController, public app: App) {

    this.http.request('Get', serverUrl + 'api/Transaction/GetUserTransactions', {})
      .subscribe(data => {
        console.log(data);
        this.items = <any>data;
      });
  }
  paydraw() {
    this.show = !this.show;
    this.showi = !this.showi;
  }
  backpressed(){
    this.navCtrl.pop();
  }
}
