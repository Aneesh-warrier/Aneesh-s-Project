import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'firebase/auth';
import 'firebase/database';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
//import { LocalNotifications } from '@ionic-native/local-notifications';
import { AlertController, Platform } from 'ionic-angular';
/*
  Generated class for the DataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DataProvider {
  items: any;
  item = { itemname: '', current_quantity: '', required_quantity: '', time: '' };
  kitchenemail=null;
  init: boolean = false;
  constructor(private plt: Platform, public alertCtrl: AlertController) {
    console.log('Hello DataProvider Provider');
  }
  submit(text: string) {
    console.log(this.item);
    var myDate: String = new Date().toISOString();
    // this.localNotifications.schedule({
    //   text: text,
    //   //at: time,
    //   led: 'FF0000'
   // });
    // let alert = this.alertCtrl.create({
    //   title: 'Congratulation!',
    //   subTitle: 'Notification setup successfully',
    //   buttons: ['OK']
    // });
    // alert.present();
  }

}