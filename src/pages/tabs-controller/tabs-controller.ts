import { Component ,ViewChild} from '@angular/core';
import { NavController, NavParams ,App,Content,ViewController } from 'ionic-angular';
import { StoreTabPage } from '../store-tab/store-tab';
import { SearchTabPage } from '../search-tab/search-tab';
import { WoopeTabPage } from '../woope-tab/woope-tab';
import { FavoriteTabPage } from '../favorite-tab/favorite-tab';
import { ProfileTabPage } from '../profile-tab/profile-tab';
import { HttpClient } from '@angular/common/http';
import { serverUrl } from '../../Globals';
import { MainTabPage } from '../main-tab/main-tab';
import {AllPostPage} from '../all-post/all-post'
@Component({
  selector: 'page-tabs-controller',
  templateUrl: 'tabs-controller.html'
})
export class TabsControllerPage {
  @ViewChild(Content) content: Content;
  profile: any;
  // this tells the tabs component which Pages
  // should be each tab's root Page
  //tab1Root: any = StoreTabPage;
  tab1Root: any = MainTabPage;
  tab2Root: any = SearchTabPage;
  //tab3Root: any = WoopeTabPage;
  tab3Root: any = AllPostPage;
  tab4Root: any = FavoriteTabPage;
  tab5Root: any = ProfileTabPage;
  constructor(private viewCtrl :ViewController, private http: HttpClient,public navCtrl: NavController,navParams: NavParams,private app:App) {
    this.profile = navParams.get('profile');
    
    this.http.post(serverUrl + 'api/Profile/GetProfile', {})
    .subscribe(data => {
      console.log(data);
      this.profile=data;
    });
  };
}
