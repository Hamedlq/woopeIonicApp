import { Component } from '@angular/core';
import { NavController, ToastController, App } from 'ionic-angular';
import { HttpParams, HttpClient, HttpHeaders } from '@angular/common/http';
import { serverUrl } from '../../Globals';
import { TabsControllerPage } from '../tabs-controller/tabs-controller';

@Component({
  selector: 'page-gift',
  templateUrl: 'gift.html'
})
export class GiftPage {
  gift: any;
  
  disableButton;
  // this tells the tabs component which Pages
  // should be each tab's root Page
  constructor(public navCtrl: NavController, private http: HttpClient, private toastCtrl: ToastController,public app: App) {
    this.disableButton=false;
  }
  submitGiftCode() {
    
    this.disableButton=true;
    var body = new HttpParams()
      .append('GiftCode', this.gift);

    this.http.request('Post', serverUrl + 'api/Gift/SubmitGiftCode', { body: body, headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded') })
      .subscribe(data => {
        
        this.disableButton=false;
        let toast = this.toastCtrl.create({
          message: data["message"],
          duration: 10000,
          position: 'bottom'
        });
        toast.onDidDismiss(() => {
          console.log('Dismissed toast');
        });

        toast.present();
      },onerror=>{this.disableButton=false;});
  }
  backpressed() {
    
    this.app.getRootNav().setRoot(TabsControllerPage);
  }
}
