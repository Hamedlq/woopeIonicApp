import { Component, ElementRef } from "@angular/core";
import { NavController, ToastController, App } from "ionic-angular";
import { HttpClient } from "@angular/common/http";
import { serverUrl } from "../../Globals";

@Component({
  selector: "page-TransactionHistory",
  templateUrl: "TransactionHistory.html"
})
export class TransactionHistoryPage {
  show = false;
  showi = true;
  items = [];
  down = "arrow ," + "icon," + "icon-ios," +  "ion-ios-arrow-down"
  up = "arrow ," + "icon icon-ios," + "ion-ios-arrow-up"
  constructor(
    public navCtrl: NavController,
    private http: HttpClient,
    private toastCtrl: ToastController,
    public app: App
  ) {
    this.http
      .request("Get", serverUrl + "api/Transaction/GetUserTransactions", {})
      .subscribe(data => {
        this.items = <any>data;
      });
  }
  paydraw(docs) {
    var elementTow  = document.getElementById(docs.id);
    var iconElement = document.getElementById(docs.id+'i');
    this.show =!this.show;
    if (this.show == true) {
      elementTow.classList.add("show");
      elementTow.classList.remove("showi");
      iconElement.classList.remove("arrow","icon","icon-ios","ion-ios-arrow-down");
      iconElement.classList.add("arrow","icon","icon-ios","ion-ios-arrow-up");
    } 
    else {
      elementTow.classList.add("showi");
      elementTow.classList.remove("show");
      iconElement.classList.remove("arrow","icon","icon-ios","ion-ios-arrow-up");
      iconElement.classList.add("arrow","icon","icon-ios","ion-ios-arrow-down");
    }
 
  }
  backpressed() {
    this.navCtrl.pop();
  }
}
