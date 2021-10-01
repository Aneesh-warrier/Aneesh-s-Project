import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, Loading } from 'ionic-angular';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireList } from 'angularfire2/database';
import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/database';
import { ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailValidator } from '../../validators/email';

/**
 * Generated class for the NewshopPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-newshop',
  templateUrl: 'newshop.html',
})
export class NewshopPage {
  public newForm: FormGroup;
  public loading: Loading;
  items: AngularFireList<any>;
  newshop = { email: '', pin: '' };

  constructor(public navCtrl: NavController, public navParams: NavParams, public afDB: AngularFireDatabase, private toastCtrl: ToastController, private formBuilder: FormBuilder, public loadingCtrl: LoadingController,
    public alertCtrl: AlertController) {

    this.items = afDB.list('stockdetails');
    this.newForm = formBuilder.group({
      email: [
        '',
        Validators.compose([Validators.required, EmailValidator.isValid])
      ],
      pin: [
        '',
        Validators.compose([Validators.required])
      ]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewshopPage');
  }
  addshop(newshop) {
    //let newTask={itemname:"pizza",current_quantity:"8",required_quantity:"3"};
    //this.items.push({itemname:'pizza',current_quantity:'8',required_quantity:'3'});
    // this.items.push(newTask);
    this.newshop = { email: '', pin: '' };

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
      .ref(`/supplier/` + cleanString)
      .push(newshop);

  }
  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'shop added successfully',
      duration: 3000,
      position: 'top'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();

  }


}
