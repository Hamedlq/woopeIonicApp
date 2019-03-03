import { NgModule } from '@angular/core';
import { IonicPageModule ,ModalController} from 'ionic-angular';
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
