import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PayInPage } from './payin';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    PayInPage,
  ],
  imports: [
    IonicPageModule.forChild(PayInPage),
  ],
})
export class PayInPageModule {}
