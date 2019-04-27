import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController ,ModalController} from 'ionic-angular';
/**
 * Generated class for the ModalConfirmationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal-confirmation',
  templateUrl: 'modalConfirmation.html',
})
export class ModalConfirmation {
  message : any ;
  
  constructor(private viewCtrl:ViewController , private modalC :ModalController, private navCtrl: NavController, public navParams: NavParams) {
    this.message=navParams.get('message');

  };
  
  closeModal(){
      this.viewCtrl.dismiss();
  };
 
}
