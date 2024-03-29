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
import { AuthInterceptor } from '../providers/authInterceptor';
import { ForgetPassSmsValidationPage } from '../pages/forgetpass-sms-validation/forgetpass-sms-validation';
import { changePassValidationPage } from '../pages/change-pass-validation/change-pass-validation';
import { StorePage } from '../pages/store-page/store-page';
import { CreditePayCodePage } from '../pages/creditepaycode/creditepaycode';
import { CashPayCodePage } from '../pages/cash-pay-code/cash-pay-code';
import { EditPage } from '../pages/Edit-Profile/Edit-Profile';
import { AllPostPage } from '../pages/all-post/all-post';
import { TransactionHistoryPage } from '../pages/TransactionHistory/TransactionHistory';
import { MainTabPage } from '../pages/main-tab/main-tab';
import { PostPage } from '../pages/post/post'
import { ModalConfirmations } from '../pages/store-page/modalConfirmations/modalConfirmations';
import { PayPageModule } from '../pages/pay/pay.module';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { TooltipsModule } from 'ionic-tooltips';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginSignupTabPage } from '../pages/login-signup-tab/login-signup-tab';
import { contactUsPage } from '../pages/ContactUS/ContactUS';
import { DataProvider } from '../providers/data/data';
import { CacheModule } from 'ionic-cache';
import { IonicStorageModule } from '@ionic/storage';
import { SelectPurpose } from '../pages/SelectPurpose/select-purpose-tab';
import { EarnMoneyPage } from '../pages/earn-money-page/earn-money-page';
import { SpendMoneyPage } from '../pages/spend-money-page/spend-money-page';
import { DecimalPipe } from '@angular/common';

@NgModule({
  declarations: [
    MyApp,
    AllPostPage,
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
    LoginSignupTabPage,
    contactUsPage,
    SelectPurpose,
    EarnMoneyPage,
    SpendMoneyPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    TooltipsModule.forRoot(),
    // CacheModule.forRoot(),
    BrowserAnimationsModule,
    PayPageModule,
    IonicStorageModule.forRoot()
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
    ModalConfirmations,
    contactUsPage,
    ModalConfirmations,
    LoginSignupTabPage,
    SelectPurpose,
    EarnMoneyPage,
    SpendMoneyPage
  ],
  providers: [
    SocialSharing,
    // StatusBar,
    ToastController,
    DecimalPipe,
    // InAppBrowser,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    DataProvider,
  ]
})
export class AppModule { }