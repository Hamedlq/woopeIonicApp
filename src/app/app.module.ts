import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler, ToastController } from 'ionic-angular';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { MyApp } from './app.component';
import { StoreTabPage } from '../pages/store-tab/store-tab';
import { SearchTabPage } from '../pages/search-tab/search-tab';
import { WoopeTabPage } from '../pages/woope-tab/woope-tab';
import { TabsControllerPage } from '../pages/tabs-controller/tabs-controller';
import { FavoriteTabPage } from '../pages/favorite-tab/favorite-tab';
import { ProfileTabPage } from '../pages/profile-tab/profile-tab';
import { SplashPage } from '../pages/splash/splash';
import { SplashSelectPage } from '../pages/splash-select/splash-select';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { SmsValidationPage } from '../pages/sms-validation/sms-validation';
import { ChangePassPage } from '../pages/change-pass/change-pass';
import { GiftPage } from '../pages/gift/gift';
import { PayPage } from '../pages/pay/pay';

import { StatusBar } from '@ionic-native/status-bar';

import { Http, XHRBackend, RequestOptions } from '@angular/http';
import { ExtendedHttpService } from '../providers/authInterceptor.ts';
import { AuthInterceptor } from '../providers/authInterceptor';


@NgModule({
  declarations: [
    MyApp,
    StoreTabPage,
    SearchTabPage,
    WoopeTabPage,
    TabsControllerPage,
    FavoriteTabPage,
    ProfileTabPage,
    SplashPage,
    SplashSelectPage,
    LoginPage,
    RegisterPage,
    SmsValidationPage,
    ChangePassPage,
    GiftPage,
    PayPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule ,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    StoreTabPage,
    SearchTabPage,
    WoopeTabPage,
    TabsControllerPage,
    FavoriteTabPage,
    ProfileTabPage,
    SplashPage,
    SplashSelectPage,
    LoginPage,
    RegisterPage,
    SmsValidationPage,
    ChangePassPage,
    GiftPage,
    PayPage
  ],
  providers: [
    StatusBar,
    ToastController,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor,multi: true },
  ]
})
export class AppModule {}