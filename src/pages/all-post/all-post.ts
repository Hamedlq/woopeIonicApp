import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,ModalController} from 'ionic-angular';
import { App } from 'ionic-angular';
import { HttpParams, HttpClient, HttpHeaders } from '@angular/common/http';
import {serverUrl} from '../../Globals';
import { StorePage } from '../store-page/store-page';

@IonicPage()
@Component({
  selector: 'all-post',
  templateUrl: 'all-post.html',
})
export class AllPostPage {
  page : any;
  message : any;
  baseUrl : any;
  ionfos = [];
  profile: any;

  constructor(public modalC : ModalController , public app :App, public navCtrl: NavController, public navParams: NavParams , private http: HttpClient) {
    this.baseUrl = serverUrl;
    this.page = 0;
    this.profile = navParams.get('profile');
    var param = new HttpParams().append('page', this.page ).append('count','6');
    this.http.get(this.baseUrl+ 'api/Product/GetAllActiveProducts',  { params: param, headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded') })
    .subscribe(data => {
      this.ionfos =<any>data;

    });
  }
  doInfinite(infiniteScroll) {
    this.page++;
    setTimeout(() => {
      var param = new HttpParams().append('page', this.page ).append('count', '6');
    this.http.get(this.baseUrl+ 'api/Product/GetAllActiveProducts',  { params: param, headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded') })
    .subscribe(data => {
          let newitems=<any>data;
          if(newitems.length>1){
            for (let i = 0; i < newitems.length; i++) {
              this.ionfos.push( newitems[i]);
            }
          }
        });
      infiniteScroll.complete();
    }, 500);
  };

  like(ionfo,event){
    if(ionfo.isLiked){
      ionfo.countLike--;
      ionfo.isLiked=false;
    }else{
      ionfo.countLike++;
      ionfo.isLiked=true;
    }
    var body = new HttpParams().append('ImageID', ionfo['id']);
    this.http.request('Post', this.baseUrl + 'api/Product/ChangeLikeImage', { body: body, headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded') })
    .subscribe(data => {
    });

};
butporo(ionfo){
  var te = new HttpParams()
      .append('ProductId',ionfo['id']);
      this.http.get(this.baseUrl + 'api/Product/SaveOnlineRequest',  { params: te, headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded') })
        .subscribe(data => {
          this.message =<any>data ;
          let modalConfirm = this.modalC.create('ModalConfirmation', {message: this.message['message']}  );
          modalConfirm.present();
        });
       
        
};
storeclick(store){
  store.storeId=store.branchId;
  this.app.getRootNav().setRoot(StorePage , { store: store,profile:this.profile});
}; 
count : number = 0;
Double(ionfo,event){
this.count++;
setTimeout(() => {
  if (this.count == 1) {
    this.count = 0;
  }
  if(this.count > 1){
    this.count = 0;
    let elementOne = ionfo.id;
    var elementTow = document.getElementById(elementOne);
    setTimeout(() => {
      elementTow.classList.remove('icon','ion-ios-heart');
    },700);
      elementTow.classList.add('icon','ion-ios-heart');
  if(!ionfo.isLiked){
      this.like(ionfo,event);
    }
  }
}, 250);

  };
};
