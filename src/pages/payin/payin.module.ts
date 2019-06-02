import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PayInPage } from './payin';


@NgModule({
  declarations: [
    PayInPage,
  ],
  imports: [
    IonicPageModule.forChild(PayInPage),
  ],
})
export class PayInPageModule {}
