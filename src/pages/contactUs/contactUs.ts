import { Component } from '@angular/core';
import { NavController, App } from 'ionic-angular';
import { TabsControllerPage } from '../tabs-controller/tabs-controller';

@Component({
  selector: 'page-contactUs',
  templateUrl: 'contactUs.html'
})
export class contactUsPage {
  constructor(public navCtrl: NavController,public app: App) {
    
  }
  backpressed() {
    
    this.app.getRootNav().setRoot(TabsControllerPage);
  }
}
