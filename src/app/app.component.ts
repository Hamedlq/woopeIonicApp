import { Component } from '@angular/core';
import { Platform, Events, App } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { Nav } from 'ionic-angular';
import { SplashPage } from '../pages/splash/splash';
import { SplashSelectPage } from '../pages/splash-select/splash-select';
import { AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {enableProdMode} from '@angular/core';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  rootPage: any = SplashPage;

  @ViewChild(Nav) navChild: Nav;

  constructor(public storage: Storage, 
    public  app: App,
    private alertCtrl: AlertController, 
    public platform: Platform, 
    public events: Events) {
    this.storage.get('first').then((first) => {
      if (first == null) {
        this.storage.set('first', 'true');
        if (platform.is('ios')) {
          this.iosAlert()
        }
        else {
          this.androidAlert()
        }
      }
    });


    //enableProdMode();

    // cache.setDefaultTTL(1 * 1); //set default cache TTL for 1 hour
    platform.ready().then(() => {

      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      // statusBar.styleDefault();

      events.subscribe('user:logout', () => {
        localStorage.removeItem("access_token");
        this.rootPage = SplashSelectPage;
      });

      events.subscribe('splash:refresh', () => {
        //this.rootPage = SplashSelectPage;
        this.rootPage = SplashPage;
      });

      events.subscribe('user:login', (token) => {
        localStorage.setItem('access_token', token);
      });
      events.subscribe('user:notverified', (token) => {
        localStorage.removeItem("access_token");
      });

      this.platform.registerBackButtonAction(() => {
        // Catches the active view
        let nav = this.app.getActiveNavs()[0];
        let activeView = nav.getActive();                
        // Checks if can go back before show up the alert
        if(activeView.name === 'TabsControllerPage') {
            if (nav.canGoBack()){
                nav.pop();
            } else {
                const alert = this.alertCtrl.create({
                    title: 'Back clicked',
                    message: 'Its a test and will be fix soon',
                });
                alert.present();
            }
        }
      },1);

    });
  }

  
  androidAlert() {
    let alert = this.alertCtrl.create({
      title: 'به ووپ خوش آمدید',
      subTitle: 'لینک دانلود اپلیکیشن اندروید ووپ',
      message: '<a href="https://cafebazaar.ir/app/ir.woope.woopeapp/?l=fa">لینک دانلود</a>',
      buttons: ['!متوجه شدم'],
      cssClass: 'android',
    });
    alert.present();
  }
  iosAlert() {
    let alert = this.alertCtrl.create({
      title: ' وب اپلیکیشن ووپ را به صفحه اصلی موبایل خود اضافه کنید',
      subTitle: '<img src ="../assets/img/fab_bg.png" width = 30px; height= auto;/>',
      message: '<div>گزینه <img src ="../assets/img/iosshare.svg" width = 15px; height= auto;/> (share) را انتخاب کنید</div><div>گزینه <img src ="../assets/img/iosAdd.svg" width = 15px; height= auto;/> Add to Home Screen را بزنید</div><div>گزینه Add را بزنید.</div>',
      buttons: ['متوجه شدم'],
      cssClass: 'ios',
    });
    alert.present();
  }
}
