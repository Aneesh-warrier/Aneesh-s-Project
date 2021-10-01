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
import { ToastController } from 'ionic-angular';

/**
 * Generated class for the ShopaddPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-shopadd',
  templateUrl: 'shopadd.html',
})
export class ShopaddPage {

  detail = { key: '', email: '', address: '', phone: '', pin: '' };
  items: AngularFireList<any>;
  public profileList: Array<any>;
  searchQuery: string = '';
  stockstringified = null;
  constructor(public navCtrl: NavController, public navParams: NavParams, public afDB: AngularFireDatabase, public userInfo: UserinfoProvider,
    public formBuilder: FormBuilder, public alertCtrl: AlertController, public d: DataProvider, public auth: AuthProvider,private toastCtrl: ToastController) {
    this.profileList = [];

    //var myDate: String = new Date().toISOString();
    this.items = afDB.list('userProfile');
    this.items.snapshotChanges().subscribe(item => {
       this.profileList.length = 0;
      item.forEach(action => {
        console.log(action);
        let details = { "key": action.key, "email": action.payload.val().email, "address": action.payload.val().address, "phone": action.payload.val().phone, "pin": action.payload.val().pin }
        //this.stockList.push(details);
        this.profileList.push(details);
        console.log(details);
      });
      this.stockstringified = JSON.stringify(this.profileList);
    })
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ShopaddPage');
  }
  delete(detail) {
    console.log(detail.key);
    this.items.remove(detail.key);
    //this.d.submit("An item has been removed");
  }
  
  presentConfirm(email, address, phone,pin) {
    let alert = this.alertCtrl.create({
      title: 'Confirm',
      message: 'Are you sure that you want to add the shop to your list? ',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Ok',
          handler: () => {
            this.done(email, address, phone,pin);
          }
        }
      ]
    });
    alert.present();
    //this.d.submit("An item is required in the kitchen")
  }
  done(email, address, phone,pin) {
    const userId: string = firebase.auth().currentUser.email;
    var cleanString = userId.replace(/[\|&;\$%@"<>\(\)\.\+,]/g, "");
    this.presentToast();
    this.navCtrl.pop(); 
    return firebase
      // .auth()
      // .createUserWithEmailAndPassword(email, password)
      // .then(newUserCredential => {
      //   newUserCredential.user.updateProfile({displayName:address,photoURL:null})
      //   firebase
           .database()
           .ref(`/supplier/`+cleanString)
           .push({ email, address, phone, pin });
          
    }
    presentToast() {
      let toast = this.toastCtrl.create({
        message: 'Shop added successfully',
        duration: 3000,
        position: 'top'
      });
  
      toast.onDidDismiss(() => {
        console.log('Dismissed toast');
      });
  
      toast.present();
     
    }
      // .catch(error => {
      //   console.error(error);
      //   throw new Error(error);
      // });
    // var temp1;
    // var temp2;
    // temp1 = parseInt(current_quantity);
    // temp2 = parseInt(required_quantity);
    // if (id) {
    //   this.items.update(id, {
    //     itemname: itemname,
    //     current_quantity: temp1 + temp2,
    //     required_quantity: temp2 - temp2
    //   });

    // } else {
    //   this.items.push({
    //     itemname: itemname,
    //     current_quantity: current_quantity,
    //     required_quantity: required_quantity
    //   })
    // }
  //}

}
