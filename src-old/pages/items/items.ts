import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireList } from 'angularfire2/database';
import { DataProvider } from '../../providers/data/data';
import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/database';

/**
 * Generated class for the ItemsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-items',
  templateUrl: 'items.html',
})
export class ItemsPage {

  supplieremail = null;
  item = { id: '', itemname: '', unit: '', current_quantity: '', required_quantity: '', changed_available: '', changed_require: '' };
  items: AngularFireList<any>;
  constructor(public navCtrl: NavController, public navParams: NavParams, public afDB: AngularFireDatabase, public d: DataProvider, public alertCtrl: AlertController) {
    var cleanString = null;
    this.supplieremail = this.navParams.get('email');
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
    this.item.id = this.navParams.get('key');
    this.item.itemname = this.navParams.get('itemname');
    this.item.unit = this.navParams.get('unit');
    this.item.current_quantity = this.navParams.get('current_quantity');
    this.item.required_quantity = this.navParams.get('required_quantity');
    this.item.changed_available = this.navParams.get('changed_available');
    this.item.changed_require = this.navParams.get('changed_require');

  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ItemsPage');
  }
  additem(id, itemname, unit, current_quantity, required_quantity, changed_available, changed_require) {
    // current_quantity=parseInt(current_quantity);
    // required_quantity=parseInt(required_quantity);
    if (id) {
      if (itemname == '' || unit == '' || current_quantity < 0 || required_quantity < 0 || current_quantity == '' || required_quantity == '') {
        let alert = this.alertCtrl.create({
          title: 'Warning!',
          subTitle: 'cannot update the item, Please check with the values you provided',
          buttons: ['OK']
        });
        alert.present();
        //this.navCtrl.push(ItemsPage);
      }

      else {
        this.items.update(id, {
          itemname: itemname,
          unit: unit,
          current_quantity: current_quantity,
          required_quantity: required_quantity,

        });
      }

    } else {
      this.items.push({
        itemname: itemname,
        unit: unit,
        current_quantity: current_quantity,
        required_quantity: required_quantity,
        changed_available: changed_available,
        changed_require: changed_require
      })

    }
    // this.d.submit("An item's requirement has been changed from the kitchen");
    this.navCtrl.pop();

  }


}
