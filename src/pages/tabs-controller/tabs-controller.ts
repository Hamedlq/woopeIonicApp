import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { StoreTabPage } from '../store-tab/store-tab';
import { SearchTabPage } from '../search-tab/search-tab';
import { WoopeTabPage } from '../woope-tab/woope-tab';
import { FavoriteTabPage } from '../favorite-tab/favorite-tab';
import { ProfileTabPage } from '../profile-tab/profile-tab';

@Component({
  selector: 'page-tabs-controller',
  templateUrl: 'tabs-controller.html'
})
export class TabsControllerPage {
  profile: any;
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = StoreTabPage;
  // tab2Root: any = SearchTabPage;
  tab3Root: any = WoopeTabPage;
  // tab4Root: any = FavoriteTabPage;
  tab5Root: any = ProfileTabPage;
  constructor(public navCtrl: NavController,navParams: NavParams) {
    this.profile = navParams.get('profile');
  }
}
