import { Component,} from '@angular/core';

import { AlertController, App, NavParams } from 'ionic-angular'
import { EarnMoneyPage } from '../earn-money-page/earn-money-page';
import { SpendMoneyPage } from '../spend-money-page/spend-money-page';


@Component({
  selector: 'page-select-purpose',
  templateUrl: 'select-purpose-tab.html'
})
export class SelectPurpose {
  password: string;
  username: string;
  
  profile: any;
  // this tells the tabs component which Pages
  // should be each tab's root Page
  constructor(public alertController: AlertController,public navParams: NavParams,public app: App) {
    this.profile = navParams.get('profile');
  }
  async earnMoney() {
    const alert = await this.alertController.create({
      title: '<img height="150" class="title_image" src="assets/img/earn_popup.png" on-click="gotoearn()">',
      message: 'فروشگاه‌ها رو تو شبکه‌های مجازی به دوستات معرفی کن و ووپ بگیر ',
      buttons: [
        {
          text: 'متوجه شدم',
          handler: () => {
            this.app.getRootNav().push(EarnMoneyPage);
          }
        }
      ]
    });

    await alert.present();
  }

  async spendMoney() {
    const alert = await this.alertController.create({
      title: '<img height="150" class="title_image" src="assets/img/pay_popup.png" on-click="gotoearn()">',
      message: 'به فروشگاه ها پرداخت کن<br> و از تخفیفاتشون استفاده کن ',
      buttons: [
        {
          text: 'متوجه شدم',
          handler: () => {
            this.app.getRootNav().push(SpendMoneyPage,{profile: this.profile });
            //console.log('متوجه شدم');
          }
        }
      ]
    });

    await alert.present();
  }

  gotoearn(){
    console.log("salam");
  }

}
