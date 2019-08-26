import { Component ,ViewChild} from '@angular/core';
import { NavController, NavParams ,App,Content,ViewController } from 'ionic-angular';
import { SearchTabPage } from '../search-tab/search-tab';
import { FavoriteTabPage } from '../favorite-tab/favorite-tab';
import { ProfileTabPage } from '../profile-tab/profile-tab';
import { HttpClient } from '@angular/common/http';
import { serverUrl } from '../../Globals';
import { MainTabPage } from '../main-tab/main-tab';
import {AllPostPage} from '../all-post/all-post'
import { LoginSignupTabPage } from '../login-signup-tab/login-signup-tab';
import { Platform } from 'ionic-angular';
import { SelectPurpose } from '../SelectPurpose/select-purpose-tab';
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
  //tab1Root: any = MainTabPage;
  tab1Root: any = SelectPurpose;
  
  tab2Root: any = SearchTabPage;
  //tab3Root: any = WoopeTabPage;
  tab3Root: any = AllPostPage;
  tab4Root: any;
  tab5Root: any ;
  constructor(private viewCtrl :ViewController, private http: HttpClient,public navCtrl: NavController,navParams: NavParams,private app:App) {
    
    this.profile = navParams.get('profile');
    let accessToken = localStorage.getItem("access_token");
    if(!accessToken){
      this.tab4Root = LoginSignupTabPage;
      this.tab5Root = LoginSignupTabPage;
    }else{
      this.http.post(serverUrl + 'api/Profile/GetProfile', {})
      .subscribe(data => {
        this.profile=data;
      });
      this.tab4Root = MainTabPage;
      this.tab5Root = ProfileTabPage;
    }
  };
  
}
