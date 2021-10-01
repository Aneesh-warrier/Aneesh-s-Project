import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireList } from 'angularfire2/database';
import { UserinfoProvider } from '../../providers/userinfo/userinfo';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SupplierPage } from '../supplier/supplier';
import { AddPage } from '../add/add';
import { ItemsPage } from '../items/items';
import { HomePage } from '../home/home';
import { DataProvider } from '../../providers/data/data';
import { AuthProvider } from '../../providers/auth/auth';
import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/database';
import { ShopPage } from '../shop/shop';
import { ShopaddPage } from '../shopadd/shopadd';
import { NewshopPage } from '../newshop/newshop';
/**

/**
 * Generated class for the UpQuantityPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-up-quantity',
  templateUrl: 'up-quantity.html',
})
export class UpQuantityPage {
  // const userId: string = firebase.auth().currentUser.uid;
 // item = { id: '', itemname: '', current_quantity: '', required_quantity: '', changed_available: '', changed_require: '' };
  //detail = { key: '', email: '', address: '', phone: '', pin: '' };
  newshop={key:'',email:'',pin:''};
  items: AngularFireList<any>;
  public profileList: Array<any>;
  searchQuery: string = '';
  stockstringified = null;
  constructor(public navCtrl: NavController, public navParams: NavParams, public afDB: AngularFireDatabase, public userInfo: UserinfoProvider,
    public formBuilder: FormBuilder, public alertCtrl: AlertController, public d: DataProvider, public auth: AuthProvider) {
    this.profileList = [];
    const userId: string = firebase.auth().currentUser.email;
    var cleanString = userId.replace(/[\|&;\$%@"<>\(\)\.\+,]/g, "");
    this.items = afDB.list('supplier/' + cleanString);

    this.items.snapshotChanges().subscribe(item => {
      this.profileList.length = 0;
      item.forEach(action => {
        console.log(action);
        let details = { "key": action.key, "email": action.payload.val().email, "pin": action.payload.val().pin }
        this.profileList.push(details);
        console.log(details);
      });
      this.stockstringified = JSON.stringify(this.profileList);
    })

    // this.item.id = this.navParams.get('key');
    // this.item.itemname = this.navParams.get('itemname');
    // this.item.current_quantity = this.navParams.get('current_quantity');
    // this.item.required_quantity = this.navParams.get('required_quantity');

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UpQuantityPage');
  }

  viewStock(email) {
    this.navCtrl.push(ShopPage,{email:email});
    this.d.kitchenemail = email;
  }

  delete(newshop) {
    console.log(newshop.key);
    this.items.remove(newshop.key);
    //this.d.submit("An item has been removed");
  }
  addShop() {
    //this.navCtrl.push(ShopaddPage);
    this.navCtrl.push(NewshopPage);

  }

  logout() {
    let alert = this.alertCtrl.create({
      title: 'Confirm',
      message: 'Do you want to logout? ',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'yes',
          handler: () => {
            localStorage.removeItem('userdetails')
            this.auth.logoutUser();
            this.navCtrl.setRoot(HomePage);
          }
        }
      ]
    });
    alert.present();
  }

  // initializeItems() {
  //   this.profileList = JSON.parse(this.stockstringified);
  // }

  // getItems(ev: any) {
  //   // Reset items back to all of the items
  //   this.initializeItems();
  //   // set val to the value of the searchbar
  //   const val = ev.target.value;
  //   // if the value is an empty string don't filter the items
  //   if (val && val.trim() != '') {
  //     this.profileList = this.profileList.filter((detail) => {
  //       return (detail.email.toLowerCase().indexOf(val.toLowerCase()) > -1);
  //     })
  //   }
  // }
  // additem(id, itemname, current_quantity, required_quantity, changed_available, changed_require) {
  //   if (id) {
  //     this.items.update(id, {
  //       itemname: itemname,
  //       //current_quantity:current_quantity,
  //       //required_quantity:required_quantity,
  //       changed_available: changed_available,
  //       changed_require: changed_require
  //     });
  //     // .then( newStock => {
  //     //   this.navCtrl.pop();
  //     // }, error => {
  //     //   console.log(error);
  //     // });
  //   } else {
  //     this.items.push({
  //       itemname: itemname,
  //       current_quantity: current_quantity,
  //       required_quantity: required_quantity,
  //       changed_available: changed_available,
  //       changed_require: changed_require
  //     })
  //     // .then( newStock => {
  //     //   this.navCtrl.pop();
  //     // }, error => {
  //     //     console.log(error);
  //     // });
  //   }
  // }

}
