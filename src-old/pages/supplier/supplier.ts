import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Platform } from 'ionic-angular';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireList } from 'angularfire2/database';
//import { LocalNotifications } from '@ionic-native/local-notifications';
import { DataProvider } from '../../providers/data/data';
import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/database';
import { ItemsPage } from '../items/items';
//import { MessagingService } from "./messaging.service";

//import 'rxjs/add/operator/take';

/**
 * Generated class for the SupplierPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-supplier',
  templateUrl: 'supplier.html',
})
export class SupplierPage {

  readonly: boolean;
  items: AngularFireList<any>;
  myDate: String = new Date().toISOString();
  supplieremail = null;

  item = { id: '', itemname: '', current_quantity: '', required_quantity: '', provided: '', amount: '', time: '' };
  //detail={id:'',pin:''};
  //detail = { key: '', email: '', address: '', phone: '', pin: '' };
  constructor(public navCtrl: NavController, public navParams: NavParams, public afDB: AngularFireDatabase, private plt: Platform, public alertCtrl: AlertController, public d: DataProvider) {
    var cleanString = null;
    this.supplieremail = this.d.kitchenemail;
    const userId: string = firebase.auth().currentUser.email;
    console.log(this.supplieremail);
    console.log(userId);
    if (this.supplieremail) {
      cleanString = this.supplieremail.replace(/[\|&;\$%@"<>\(\)\.\+,]/g, "");
    }
    else {
      cleanString = userId.replace(/[\|&;\$%@"<>\(\)\.\+,]/g, "");
    }
    this.items = afDB.list('kitchen/' + cleanString);
    //db.list('/items', ref => ref.orderByChild('size').equalTo('large'))
    this.item.id = this.navParams.get('key');
    this.item.itemname = this.navParams.get('itemname');
    this.item.current_quantity = this.navParams.get('current_quantity');
    this.item.required_quantity = this.navParams.get('required_quantity');
    //this.item.amount = this.navParams.get('amount');
    this.item.time = this.navParams.get('time');
    this.item.provided = this.navParams.get('provided');
    this.readonly = true
    //this.detail.pin=this.navParams.get('pin');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SupplierPage');
  }
  additem(id, itemname, current_quantity, required_quantity, provided, amount, time) {
    var cur;
    var prov;
    var req;
    
    cur = parseInt(current_quantity);
    prov = 0+parseInt(provided);
    req = parseInt(required_quantity);
    if (id) {
      if(prov>0){
        if(prov<=req){
      this.items.update(id, {
        itemname: itemname,
        current_quantity: cur + prov,
        required_quantity: req - prov,
        provided: prov - prov,
       // amount: amount,
        time: Date.now()

      });
    }
    else{
      let alert = this.alertCtrl.create({
        title: 'Warning!',
        subTitle: 'The quantity is more than required',
        buttons: ['OK']
      });
      alert.present();
      //this.navCtrl.push(ItemsPage);
    }

    }
    else{
      let alert = this.alertCtrl.create({
        title: 'Warning!',
        subTitle: 'No items to update',
        buttons: ['OK']
      });
      alert.present();
      //this.navCtrl.push(ItemsPage);
    }

    } else {
      this.items.push({
        itemname: itemname,
        current_quantity: current_quantity,
        required_quantity: required_quantity,
       // amount: amount,
        time: Date.now()

      })
    }
    this.navCtrl.pop();
    //this.d.submit("An item is provided by the supplier");
  }
  // scheduleNotification() {
  //   this.localNotifications.schedule({
  //     id: 1,
  //     title: 'Attention',
  //     text: 'Simons Notification',
  //     data: { mydata: 'My hidden message this is' },
  //     //at: new Date(new Date().getTime() + 5 * 1000)
  //   });
  // }
  // submit() {
  //   console.log(this.item);
  //   var date = new Date(this.item.time);
  //   console.log(date);
  //   this.localNotifications.schedule({
  //      text: 'An item is provided by the supplier',
  //      //at: time,
  //      led: 'FF0000',
  //      //sound: this.setSound(),
  //   });
  //   let alert = this.alertCtrl.create({
  //     title: 'Congratulation!',
  //     subTitle: 'Notification setup successfully at '+date,
  //     buttons: ['OK']
  //   });
  //   alert.present();
  //   //this.item = { itemname:'', current_quantity:'', required_quantity:'', time:'' };
  // }

}
