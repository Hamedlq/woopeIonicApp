import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PayPage } from './pay';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    PayPage,
  ],
  imports: [
    IonicPageModule.forChild(PayPage),
  ],
})
export class PayPageModule {}
