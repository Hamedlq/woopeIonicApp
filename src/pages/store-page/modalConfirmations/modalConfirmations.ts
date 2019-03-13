import { Component } from '@angular/core';
import { NavController, NavParams,ViewController ,ModalController} from 'ionic-angular';
@Component({
  selector: 'page-modal-confirmations',
  templateUrl: 'modalConfirmations.html',
})
export class ModalConfirmations {
  message : any ;
  
  constructor(private viewCtrl:ViewController , private modalC :ModalController, private navCtrl: NavController, public navParams: NavParams) {
    this.message=navParams.get('message');

  };
  
  closeModal(){
      this.viewCtrl.dismiss();
  };
 
}
