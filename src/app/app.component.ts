import { Component } from '@angular/core';
import { Platform, Events, NavParams } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';

import {ViewChild} from '@angular/core';

import {App,  Nav, NavController} from 'ionic-angular';
import { Deeplinks} from 'ionic-native';
import {HomePage} from './pages/home/home';
import {AboutPage} from './pages/about/about';
import {ProductPage} from './pages/product/product';

import { TabsControllerPage } from '../pages/tabs-controller/tabs-controller';
import { SplashPage } from '../pages/splash/splash';
import { SplashSelectPage } from '../pages/splash-select/splash-select';
import { RegisterPage } from '../pages/register/register';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  rootPage: any = SplashPage;

  @ViewChild(Nav) navChild:Nav;

  constructor(public platform: Platform, statusBar: StatusBar, public events: Events) {
   
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
