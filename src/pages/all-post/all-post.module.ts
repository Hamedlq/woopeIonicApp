import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AllPostPage } from './all-post';

@NgModule({
  declarations: [
    AllPostPage,
  ],
  imports: [
    IonicPageModule.forChild(AllPostPage),
  ],
})
export class AllPost {}
