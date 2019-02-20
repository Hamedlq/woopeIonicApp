import { NgModule } from '@angular/core';
import { IonicPageModule ,ModalController} from 'ionic-angular';
import { ModalConfirmation } from './modalConfirmation';

@NgModule({
  declarations: [
    ModalConfirmation,
  ],
  imports: [
    IonicPageModule.forChild(ModalConfirmation),
  ],
})
export class ModalConfirmationPageModule {}
