import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireList } from 'angularfire2/database';
import { ItemsPage } from '../items/items';
import { ToastController } from 'ionic-angular';
import { ShopPage } from '../shop/shop';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Alert, Loading, LoadingController, AlertController } from 'ionic-angular';
import { UserinfoProvider } from '../../providers/userinfo/userinfo';
import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/database';

/**
 * Generated class for the AddPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add',
  templateUrl: 'add.html',
})
export class AddPage {
  public addForm: FormGroup;
  public loading: Loading;
  items: AngularFireList<any>;
  newTask = { itemname: '', unit: '', current_quantity: '', required_quantity: '' };

  constructor(public navCtrl: NavController, public navParams: NavParams, public afDB: AngularFireDatabase, private toastCtrl: ToastController, private formBuilder: FormBuilder, public loadingCtrl: LoadingController,
    public alertCtrl: AlertController) {
    this.items = afDB.list('stockdetails');
    this.addForm = formBuilder.group({
      itemname: [
        '',
        Validators.compose([Validators.required])
      ],
      unit: [
        '',
        Validators.compose([Validators.required])
      ],
      current_quantity: [
        '',
        Validators.compose([Validators.required])
      ],
      required_quantity: [
        '',
        Validators.compose([Validators.required])
      ]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddPage');
  }
  addTask(newTask) {
    //let newTask={itemname:"pizza",current_quantity:"8",required_quantity:"3"};
    //this.items.push({itemname:'pizza',current_quantity:'8',required_quantity:'3'});
    // this.items.push(newTask);
    this.newTask = { itemname: '', unit: '', current_quantity: '', required_quantity: '' };

    this.presentToast();
    this.navCtrl.pop();
    const userId: string = firebase.auth().currentUser.email;
    var cleanString = userId.replace(/[\|&;\$%@"<>\(\)\.\+,]/g, "");


    return firebase
      // .auth()
      // .createUserWithEmailAndPassword(email, password)
      // .then(newUserCredential => {
      //   newUserCredential.user.updateProfile({displayName:address,photoURL:null})
      //   firebase
      .database()
      .ref(`/kitchen/` + cleanString)
      .push(newTask);

  }
  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Item added successfully, The quantity will be based on the unit you provided',
      duration: 5000,
      position: 'top'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();

  }

}
