import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController, Events } from 'ionic-angular';
import {SplashSelectPage} from '../../splash-select/splash-select';
import { MainTabPage } from '../../main-tab/main-tab';
import { TabsControllerPage } from '../../tabs-controller/tabs-controller';

@IonicPage()
@Component({
  selector: 'page-modal-confirmation',
  templateUrl: 'modal-confirmation.html',
})
export class ModalConfirmationPage {
  constructor(private viewCtrl:ViewController , private navCtrl: NavController, 
    public navParams: NavParams, public events: Events) {
  };
  
  closeModal(){
      this.viewCtrl.dismiss();
  };
  logout(){
    localStorage.clear(); 
    this.events.publish('user:logout');
    this.navCtrl.push(TabsControllerPage);
  };

}
