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
import { StatusBar } from '@ionic-native/status-bar';
import { AuthInterceptor } from '../providers/authInterceptor';
import { ForgetPassSmsValidationPage } from '../pages/forgetpass-sms-validation/forgetpass-sms-validation';
import { changePassValidationPage } from '../pages/change-pass-validation/change-pass-validation';
import { StorePage } from '../pages/store-page/store-page';
import { CreditePayCodePage } from '../pages/creditepaycode/creditepaycode';
import { CashPayCodePage } from '../pages/cash-pay-code/cash-pay-code';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { EditPage } from '../pages/Edit-Profile/Edit-Profile';
import { AllPostPage } from '../pages/all-post/all-post';
import { TransactionHistoryPage } from '../pages/TransactionHistory/TransactionHistory';
import { MainTabPage } from '../pages/main-tab/main-tab';
import { PostPage } from '../pages/post/post'
import { ModalConfirmations } from '../pages/store-page/modalConfirmations/modalConfirmations';
import { PayPageModule } from '../pages/pay/pay.module';


@NgModule({
  declarations: [
    AllPostPage,
    MyApp,
    StoreTabPage,
    SearchTabPage,
    MainTabPage,
    WoopeTabPage,
    TabsControllerPage,
    FavoriteTabPage,
    ProfileTabPage,
    SplashPage,
    SplashSelectPage,
    LoginPage,
    RegisterPage,
    SmsValidationPage,
    ForgetPassSmsValidationPage,
    changePassValidationPage,
    ChangePassPage,
    GiftPage,
    StorePage,
    PostPage,
    CreditePayCodePage,
    CashPayCodePage,
    EditPage,
    TransactionHistoryPage,
    ModalConfirmations,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    PayPageModule,
    // RouterModule.forRoot([
    //   { path: '', component: LoginPage },
    //   { path: 'login', component: LoginPage },
    // ])
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    AllPostPage,
    MyApp,
    StoreTabPage,
    PostPage,
    SearchTabPage,
    MainTabPage,
    WoopeTabPage,
    TabsControllerPage,
    FavoriteTabPage,
    ProfileTabPage,
    SplashPage,
    SplashSelectPage,
    LoginPage,
    RegisterPage,
    SmsValidationPage,
    ForgetPassSmsValidationPage,
    changePassValidationPage,
    ChangePassPage,
    GiftPage,
    StorePage,
    CreditePayCodePage,
    CashPayCodePage,
    EditPage,
    TransactionHistoryPage,
    ModalConfirmations
  ],
  providers: [
    StatusBar,
    ToastController,
    InAppBrowser,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ]
})
export class AppModule { }