import { Component } from "@angular/core";
import {
  NavController,
  ToastController,
  NavParams,
  App
} from "ionic-angular";
import { HttpParams, HttpHeaders, HttpClient } from "@angular/common/http";
import { serverUrl } from "../../Globals";
import { StorePage } from "../store-page/store-page";

@Component({
  selector: "page-favorite-tab",
  templateUrl: "favorite-tab.html"
})
export class FavoriteTabPage {
  profile: any;
  baseUrl: any;
  ss = false;
  items = [];
  constructor(
    public navCtrl: NavController,
    private http: HttpClient,
    private toastCtrl: ToastController,
    public navParams: NavParams,
    public app: App
  ) {
    this.profile = navParams.get("profile");
    this.baseUrl = serverUrl;
    var body = new HttpParams();
    this.http
      .request("Get", this.baseUrl + "api/Store/GetFollowingStores", {
        headers: new HttpHeaders().set(
          "Content-Type",
          "application/x-www-form-urlencoded"
        )
      })
      .subscribe(data => {
        console.log(data);
        this.items = <any>data;
      });
  }
  ionViewWillEnter() {
    this.http
      .request("Get", this.baseUrl + "api/Store/GetFollowingStores", {
        headers: new HttpHeaders().set(
          "Content-Type",
          "application/x-www-form-urlencoded"
        )
      })
      .subscribe(data => {
        console.log(data);
        this.items = <any>data;
      });
  }
  storeclick(store) {
    this.app
      .getRootNav()
      .setRoot(StorePage, { store: store, profile: this.profile });
  }
  like(store, event) {
    var body = new HttpParams().append("branchId", store.storeId);
    this.http
      .request("Post", this.baseUrl + "api/Store/FollowStore", {
        body: body,
        headers: new HttpHeaders().set(
          "Content-Type",
          "application/x-www-form-urlencoded"
        )
      })
      .subscribe(data => {
        console.log(data);
      });
    event.target.classList.toggle("like");
    this.http
      .request("Get", this.baseUrl + "api/Store/GetFollowingStores", {
        headers: new HttpHeaders().set(
          "Content-Type",
          "application/x-www-form-urlencoded"
        )
      })
      .subscribe(data => {
        console.log(data);
        this.items = <any>data;
      });
  }

}
