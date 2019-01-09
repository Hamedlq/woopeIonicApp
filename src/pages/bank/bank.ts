import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage(
  {
    name: 'bank',
    segment: 'bankreturn'
  }
)
@Component({
  selector: 'page-bank',
  templateUrl: 'bank.html',
})
export class BankPage {
  State: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.State = navParams.get('State');
    console.log(this.State);
    console.log("omadbank");

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BankPage');
  }

}
