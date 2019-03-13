import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ForgetPassSmsValidationPage } from '../forgetpass-sms-validation/forgetpass-sms-validation';

@Component({
  selector: 'page-change-pass',
  templateUrl: 'change-pass.html'
})
export class ChangePassPage {
  mobile:string;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
  sendConfirmSms(){
    this.navCtrl.push(ForgetPassSmsValidationPage,{mobile:this.mobile});
  }
}
