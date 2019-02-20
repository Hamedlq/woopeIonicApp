import { NgModule } from '@angular/core';
import { IonicPageModule ,ModalController} from 'ionic-angular';
import { ModalConfirmations } from './modalConfirmation';

@NgModule({
  declarations: [
    ModalConfirmations,
  ],
  imports: [
    IonicPageModule.forChild(ModalConfirmations),
  ],
})
export class ModalConfirmationPageModule {}
