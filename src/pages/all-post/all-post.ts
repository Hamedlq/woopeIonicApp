import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,ModalController} from 'ionic-angular';
import { App } from 'ionic-angular';
import { HttpParams, HttpClient, HttpHeaders } from '@angular/common/http';
import { AlertController } from 'ionic-angular';
import {serverUrl} from '../../Globals';

/**
 * Generated class for the AllPostPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

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
  constructor(public modalC : ModalController , public app :App, public navCtrl: NavController, public navParams: NavParams , private http: HttpClient) {
    this.baseUrl = serverUrl;
    this.page = 0;
    
    var param = new HttpParams().append('page', this.page ).append('count', '6' );
    this.http.get(this.baseUrl+ 'api/Product/GetAllActiveProducts',  { params: param, headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded') })
    .subscribe(data => {
      this.ionfos =<any>data;
      console.log(this.ionfos)
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
    var body = new HttpParams().append('ImageID', ionfo['id']);
    this.http.request('Post', this.baseUrl + 'api/Product/ChangeLikeImage', { body: body, headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded') })
    .subscribe(data => {
      for(let i=0 ; this.ionfos.length > i ; i++){
      if(data['id'] === ionfo['id']){
        this.ionfos[i].countLike= data['countLike'];
      };
    };
    });
   event.target.classList.toggle('like');
};
butporo(ionfo){
  var te = new HttpParams()
      .append('ProductId',ionfo['id']);
      this.http.get(this.baseUrl + 'api/Product/SaveOnlineRequest?',  { params: te, headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded') })
        .subscribe(data => {
          this.message =<any>data ;
         
          let modalConfirm = this.modalC.create('ModalConfirmation', {message: this.message['message']}  );
          modalConfirm.present();
        });
       
        
};
};

