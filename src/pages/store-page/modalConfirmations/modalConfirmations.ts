import { Component } from '@angular/core';
import { NavParams,ViewController } from 'ionic-angular';
@Component({
  selector: 'page-modal-confirmations',
  templateUrl: 'modalConfirmations.html',
})
export class ModalConfirmations {
  message : any ;
  
  constructor(private viewCtrl:ViewController , public navParams: NavParams) {
    this.message=navParams.get('message');

  };
  
  closeModal(){
      this.viewCtrl.dismiss();
  };
 
}
