import { Component } from '@angular/core';
import { Platform, Events } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { Nav } from 'ionic-angular';
import { SplashPage } from '../pages/splash/splash';
import { SplashSelectPage } from '../pages/splash-select/splash-select';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  rootPage: any = SplashPage;

  @ViewChild(Nav) navChild: Nav;

  constructor(public platform: Platform, public events: Events) {
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

    });
  }
}
