import { Component } from '@angular/core';
import { NavController, App , ModalController} from 'ionic-angular';
import {serverUrl} from '../../Globals'
import { HttpParams, HttpHeaders, HttpClient } from '@angular/common/http';
import { TabsControllerPage } from '../tabs-controller/tabs-controller';

@Component({
  selector: 'Edit-Profile',
  templateUrl: 'Edit-Profile.html'
})
export class EditPage {
  Itames=[];
  classMan: string = 'borderGanderNull';
  classWoman:string = 'borderGanderNull';
  lastName:string= this.Itames['name'];
  firstName:string= this.Itames['family'];
  email:string= this.Itames['email'];
  age:string= this.Itames['age'];
  bio:string= this.Itames['userBio'];
  gender:string= this.Itames['gender'];
  gift:any;
  profile:any;
  baseUrl=serverUrl;

  constructor(
    public app:App ,
    public navCtrl: NavController,
    private http:HttpClient,
    private modalC :ModalController) {
      this.http.post(serverUrl + 'api/Profile/GetProfile', {})
      .subscribe(data => {
        console.log(data);
        this.profile=data;
      });
    this.http.request('post',this.baseUrl+'api/Profile/GetProfile',{headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded') })
    .subscribe(data => {  
      console.log(<any>data);
      this.Itames=<any>data;
      this.lastName= data['name'];
      if(this.lastName=='undefined')
        this.lastName="";
      this.firstName= data['family'];
      if(this.firstName=='undefined')
        this.firstName="";
      this.email= data['email'];
      if(this.email=='undefined'||this.email=='null')
        this.email="";
      this.age= data['age'];
      if(this.age=='undefined' ||this.age=='0' )
        this.age="";
      this.bio= data['userBio'];
      if(this.bio=='undefined')
        this.bio="";
      this.gender= data['gender'];
      if(data['gender']=='1')
          this.classMan="borderGander" 
      else if(data['gender']=='2')
          this.classWoman="borderGander" 
    });
  }
  setInformation(){
    console.log('amir');
    var body =new HttpParams()
    .append('Name',this.firstName)
    .append('Family',this.lastName)
    .append('UserBio',this.bio)
    .append('Email',this.email)
    .append('Gender',this.gender)
    .append('Age',this.age);
    this.http.request('post',this.baseUrl+'api/Profile/SetProfile',{body:body , headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
  }).subscribe(data => {   
    console.log(<any>data);  
  });
  this.navCtrl.push(TabsControllerPage);
};

selectMan(){
  this.gender='1';
  this.classMan='borderGander';
  this.classWoman='borderGanderNull';
};
selectWoman(){
  this.gender='2';
  this.classWoman='borderGander';
  this.classMan='borderGanderNull';
};
logout(){
  let modalConfirm = this.modalC.create('ModalConfirmationPage');
  modalConfirm.present();
};

butBack() {
  this.navCtrl.pop();
};
};
