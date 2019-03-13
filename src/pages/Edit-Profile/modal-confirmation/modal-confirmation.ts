import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';
import {SplashSelectPage} from '../../splash-select/splash-select';

@IonicPage()
@Component({
  selector: 'page-modal-confirmation',
  templateUrl: 'modal-confirmation.html',
})
export class ModalConfirmationPage {
  constructor(private viewCtrl:ViewController , private navCtrl: NavController, public navParams: NavParams) {
  };
  
  closeModal(){
      this.viewCtrl.dismiss();
  };
  logout(){
    localStorage.clear(); 
    this.navCtrl.push(SplashSelectPage);
  };

}
