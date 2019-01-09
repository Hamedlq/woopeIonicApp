import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'Edit-Profile',
  templateUrl: 'Edit-Profile.html'
})
export class EditPage {
  gift:any;
  // this tells the tabs component which Pages
  // should be each tab's root Page
  constructor(public navCtrl: NavController) {

  }
  giftcode(){
    
  }
}
