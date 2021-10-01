import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewshopPage } from './newshop';

@NgModule({
  declarations: [
    NewshopPage,
  ],
  imports: [
    IonicPageModule.forChild(NewshopPage),
  ],
})
export class NewshopPageModule {}
