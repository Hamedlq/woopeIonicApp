import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,ModalController} from 'ionic-angular';
import { App } from 'ionic-angular';
import { HttpParams, HttpClient, HttpHeaders } from '@angular/common/http';
import { AlertController } from 'ionic-angular';
import {serverUrl} from '../../Globals';

@Component({
  selector: 'page-post',
  templateUrl: 'post.html',
})
export class PostPage {
  profile : any ;
  post ={};
  postt: any; 
  baseUrl :any ;
  ionfo =[];
  constructor(public navCtrl: NavController, private http: HttpClient,
    public navParams: NavParams, private alertCtrl: AlertController,public app: App,private modalC :ModalController) {
      this.profile = navParams.get('profile');
     this.postt=navParams.get('post')
      this.baseUrl  =serverUrl;  
      var te = new HttpParams()
      .append('ProductId',this.postt.id).append('branchId' , this.postt.branchId).append('page' ,'0').append('count' ,'1');
      this.http.get(serverUrl + 'api/Product/GetActiveProduct?',  { params: te, headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded') })
        .subscribe(data => {
          this.post = <any>data[0];
         
    })
  };
  like(post,event){
    if(post.isLiked){
      post.countLike--;
      post.isLiked=false;
    }else{
      post.countLike++;
      post.isLiked=true;
    }
    var body = new HttpParams().append('ImageID', post.id);
    this.http.request('Post', this.baseUrl + 'api/Product/ChangeLikeImage', { body: body, headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded') })
    .subscribe(data => {
    });
   event.target.classList.toggle('like');

  //   var body = new HttpParams().append('ImageID', post.id);
  //   this.http.request('Post', this.baseUrl + 'api/Product/ChangeLikeImage', { body: body, headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded') })
  //   .subscribe(data =>{
  //     this.post['countLike']= data['countLike'];

     
  // });
  //  event.target.classList.toggle('like');
};
  // ionViewWillEnter() {
butporo(){
  var te = new HttpParams()
      .append('ProductId',this.postt.id);
      this.http.get(this.baseUrl + 'api/Product/SaveOnlineRequest?',  { params: te, headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded') })
        .subscribe(data => {
          this.ionfo =<any>data ;
          let modalConfirm = this.modalC.create('ModalConfirmation', {message: this.ionfo['message']}  );
          modalConfirm.present();
        });
       
        
};
}
