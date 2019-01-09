import { Component } from '@angular/core';
import { Platform, Events, NavParams } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';



import { TabsControllerPage } from '../pages/tabs-controller/tabs-controller';
import { SplashPage } from '../pages/splash/splash';
import { SplashSelectPage } from '../pages/splash-select/splash-select';
import { RegisterPage } from '../pages/register/register';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  rootPage: any = SplashPage;

  constructor(platform: Platform, statusBar: StatusBar, public events: Events) {
   
    platform.ready().then(() => {
      
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();

      events.subscribe('user:logout', () => {
        this.rootPage = SplashSelectPage;
      });

      events.subscribe('splash:refresh', () => {
        //this.rootPage = SplashSelectPage;
        this.rootPage = SplashPage;
      });

      events.subscribe('user:login', (token) => {
        localStorage.setItem('access_token', token);
      });

    });
  }
}
