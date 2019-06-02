import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { App } from 'ionic-angular';
import { HttpParams, HttpClient, HttpHeaders } from '@angular/common/http';
import { serverUrl } from '../../Globals';

@Component({
  selector: 'page-post',
  templateUrl: 'post.html',
})
export class PostPage {
  profile: any;
  post = {};
  postt: any;
  baseUrl: any;
  ionfo = [];
  constructor(public navCtrl: NavController, private http: HttpClient,
    public navParams: NavParams, public app: App) {
    this.profile = navParams.get('profile');
    this.postt = navParams.get('post')
    this.baseUrl = serverUrl;
    var te = new HttpParams()
      .append('PostId', this.postt.id).append('branchId', this.postt.branchId).append('page', '0').append('count', '1');
    this.http.get(serverUrl + 'api/Post/GetActivePost?', { params: te, headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded') })
      .subscribe(data => {
        this.post = <any>data[0];
        console.log(this.post)
      })
  };
  like(post) {
    if (post.isLiked) {
      post.countLike--;
      post.isLiked = false;
    } else {
      post.countLike++;
      post.isLiked = true;
    }
    var body = new HttpParams().append('ImageID', post.id);
    this.http.request('Post', this.baseUrl + 'api/Post/ChangeLikeImage', { body: body, headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded') })
      .subscribe(data => {
      });
  };
  count: number = 0;
  Double(post, event) {
    this.count++;
    setTimeout(() => {
      if (this.count == 1) {
        this.count = 0;
      }
      if (this.count > 1) {
        this.count = 0;
        let elementOne = post.id;
        var elementTow = document.getElementById(elementOne);
        setTimeout(() => {
          elementTow.classList.remove('icon', 'ion-ios-heart');
        }, 700);
        elementTow.classList.add('icon', 'ion-ios-heart');
        if (!post.isLiked) {
          this.like(post);
        }
      }
    }, 250);
  };

  // butporo(){
  //   var te = new HttpParams()
  //       .append('PostId',this.postt.id);
  //       this.http.get(this.baseUrl + 'api/Post/SaveOnlineRequest?',  { params: te, headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded') })
  //         .subscribe(data => {
  //           this.ionfo =<any>data ;
  //           let modalConfirm = this.modalC.create('ModalConfirmation', {message: this.ionfo['message']}  );
  //           modalConfirm.present();
  //         });      
  // };
  butBack() {
    this.navCtrl.pop();
  };
}
