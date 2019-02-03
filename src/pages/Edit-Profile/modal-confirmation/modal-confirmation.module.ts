import { NgModule } from '@angular/core';
import { IonicPageModule ,ModalController} from 'ionic-angular';
import { ModalConfirmationPage } from './modal-confirmation';

@NgModule({
  declarations: [
    ModalConfirmationPage,
  ],
  imports: [
    IonicPageModule.forChild(ModalConfirmationPage),
  ],
})
export class ModalConfirmationPageModule {}
