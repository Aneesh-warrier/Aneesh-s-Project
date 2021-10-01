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
/**
 * Generated class for the ShopPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-shop',
  templateUrl: 'shop.html',
})
export class ShopPage {
  public ShopForm: FormGroup;

  item = { key: '', itemname: '', unit:'',current_quantity: '', required_quantity: '', amount: '', time: '' };
  items: AngularFireList<any>;
  public stockList: Array<any>;
  public tempstockList: Array<any>;
  searchQuery: string = '';
  supplieremail = null;
  stockstringified = null;
  private sortflag: boolean = true;
  constructor(public navCtrl: NavController, public navParams: NavParams, public afDB: AngularFireDatabase, public userInfo: UserinfoProvider,
    public formBuilder: FormBuilder, public alertCtrl: AlertController, public d: DataProvider, public auth: AuthProvider) {

    this.stockList = [];
    this.tempstockList = [];
    var cleanString = null;
    var myDate: String = new Date().toISOString();
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

    //if(this.flag){
    //this.items = afDB.list('stockdetails', ref => ref.orderByChild('itemname'));
    //}
    this.items = afDB.list('kitchen/' + cleanString);
    this.items.snapshotChanges().subscribe(item => {
      //this.stockList.length=0;
      this.tempstockList.length = 0;
      item.forEach(action => {
        console.log(action);
        let details = { "key": action.key, "itemname": action.payload.val().itemname,"unit":action.payload.val().unit, "current_quantity": action.payload.val().current_quantity, "required_quantity": action.payload.val().required_quantity, "amount": action.payload.val().amount, "time": action.payload.val().time }
        var temp = parseInt(details.current_quantity);
        //this.stockList.push(details);
        this.tempstockList.push(details);
        console.log(this.stockList);
      });

      if (this.stockList.length == 0) {
        this.stockList = this.tempstockList;
        this.sortData();
      }
      else {
        /*for(let i of this.tempstockList){
          for(let j of this.stockList){
            if(i.key==j.key){
              j.itemname=i.itemname;
              j.current_quantity=i.current_quantity;
              j.required_quantity=i.required_quantity;
            }
          }
        }*/
      }
      //this.d.submit("An item has been updated");
      //console.log(this.flag);
      // if (this.sortflag) {
      //   this.sortData();
      // }
      this.stockstringified = JSON.stringify(this.stockList);
    })

  }

  ionViewDidLoad() {
    //this.sortflag = true;
    console.log('ionViewDidLoad ShopPage');
    console.log(this.userInfo.uderdetails.type);
  }

  sortData() {
    this.stockList.sort((a, b) => {
      return (a.time) - (b.time);
    });
    this.sortflag = false;
  }

  add() {
    this.navCtrl.push(AddPage);
  }

  checkin(item) {
    if (this.userInfo.uderdetails.type == 'kitchen') {
      this.navCtrl.push(ItemsPage, {
        key: item.key,
        itemname: item.itemname,
        unit:item.unit,
        current_quantity: item.current_quantity,
        required_quantity: item.required_quantity,
        amount: item.amount,
        time: Date.now()
      });
    }
    else {
      this.navCtrl.push(SupplierPage, {
        key: item.key,
        itemname: item.itemname,
        unit:item.unit,
        current_quantity: item.current_quantity,
        required_quantity: item.required_quantity,

        //amount:item.amount

      });
    }
  }

  delete(item) {
    console.log(item.key);
    this.items.remove(item.key);
    //this.d.submit("An item has been removed");
  }

  additem(key, itemname, unit, current_quantity, required_quantity) {
    //this.flag = false;
    var req;
    req = parseInt(required_quantity);
    if(req>=0){
    if (key) {
      this.items.update(key, {
        itemname: itemname,
        unit:unit,
        current_quantity: current_quantity,
        required_quantity: req + 1,
        //amount: amount,
        time: Date.now()
      });
    } 
    else {
      this.items.push({
        itemname: itemname,
        unit:unit,
        current_quantity: current_quantity,
        required_quantity: required_quantity,
      })
    }
    //this.d.submit("An item is required in the kitchen");
  }else{
    if (key) {
      this.items.update(key, {
        itemname: itemname,
        unit:unit,
        current_quantity: current_quantity,
        required_quantity: 0 + 1,
        //amount: amount,
        time: Date.now()
      });
    } 
    else {
      this.items.push({
        itemname: itemname,
        unit:unit,
        current_quantity: current_quantity,
        required_quantity: required_quantity,
      })
    }
  }
}

  done(id, itemname,unit, current_quantity, required_quantity) {
    var cur;
    var req;
    cur = parseInt(current_quantity);
    req = parseInt(required_quantity);
    if (id) {
      this.items.update(id, {
        itemname: itemname,
        unit:unit,
        current_quantity: cur + req,
        required_quantity: req - req
      });
    } else {
      this.items.push({
        itemname: itemname,
        unit:unit,
        current_quantity: current_quantity,
        required_quantity: required_quantity
      })
    }
  }

  presentConfirm(id, itemname,unit, current_quantity, required_quantity) {
    let alert = this.alertCtrl.create({
      title: 'Confirm',
      message: 'Are you sure that you have required quantity of items? ',
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
            this.done(id, itemname,unit, current_quantity, required_quantity);
          }
        }
      ]
    });
    alert.present();
    //this.d.submit("An item is required in the kitchen")
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

  initializeItems() {
    this.stockList = JSON.parse(this.stockstringified);
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();
    // set val to the value of the searchbar
    const val = ev.target.value;
    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.stockList = this.stockList.filter((item) => {
        return (item.itemname.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }
}