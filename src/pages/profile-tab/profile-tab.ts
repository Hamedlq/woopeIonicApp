import { Component } from '@angular/core';
import { NavController, NavParams, App, AlertController } from 'ionic-angular';
import { TransactionHistoryPage } from '../TransactionHistory/TransactionHistory';
import { EditPage } from '../Edit-Profile/Edit-Profile';
import { serverUrl } from '../../Globals'
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { FavoriteTabPage } from '../favorite-tab/favorite-tab';
import { ResponseStatus } from '../Enum/enum';
@Component({
  selector: 'page-profile-tab',
  templateUrl: 'profile-tab.html'
})
export class ProfileTabPage {
  profile: any;
  baseUrl = serverUrl;
  tooltipEvent = 'click';
  tittle: string = "با پول جایزه‌ی اشتراکت چیکار می‌خواهی بکنی؟";
  // this tells the tabs component which Pages
  // should be each tab's root Page
  constructor(public app: App,
    public navCtrl: NavController,
    private http: HttpClient,
    public alertController: AlertController,
    navParams: NavParams, ) {
    this.profile = navParams.get('profile');
  };

  openEditPage() {
    //this.app.getRootNav().setRoot(EditPage);
    this.navCtrl.push(EditPage);
  };
  transactionhistory() {
    this.navCtrl.push(TransactionHistoryPage);
  };
  bookMarked() {
    this.navCtrl.push(FavoriteTabPage);
  };
  ionViewWillEnter() {
    let accessToken = localStorage.getItem("access_token");
    if(accessToken){
    this.http.post(serverUrl + 'api/Profile/GetProfile', {})
      .subscribe(data => {
        this.profile = data;
        console.log(this.profile);
      });
  };
  }

  payClick(){
    var body = new HttpParams().append('payOrTransfer', '5');
    this.http.request('Post', this.baseUrl + 'api/Checkout/ShareMoneyRequest', { body: body, headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded') })
      .subscribe(info => {
        if (info['status'] != ResponseStatus.Success) {
          this.shoeMessage(info['message']) ;
        }
        else if (info['status'] == ResponseStatus.Success) {
          this.shoeMessage(info['message']) ;
        }
      });
  }
  transferClick(){
    var body = new HttpParams().append('payOrTransfer', '10');
    this.http.request('Post', this.baseUrl + 'api/Checkout/ShareMoneyRequest', { body: body, headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded') })
      .subscribe(info => {
        if (info['status'] != ResponseStatus.Success) {
          this.shoeMessage(info['message']) ;
        }
        else if (info['status'] == ResponseStatus.Success) {
          this.shoeMessage(info['message']) ;
        }
      });
  }

  async shoeMessage(message) {
    const alert = await this.alertController.create({
      title: message,
        buttons: [{
            text: 'باشه',
            role: 'cancel',
          }]
    });

    await alert.present();
  }
};
