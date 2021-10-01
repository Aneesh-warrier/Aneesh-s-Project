import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Alert, AlertController, Loading, LoadingController,Platform } from "ionic-angular";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthProvider } from "../../providers/auth/auth";
import { EmailValidator } from "../../validators/email";
import { HomePage } from "../home/home";
import { AngularFireDatabase } from '@angular/fire/database';
import {DomSanitizer} from '@angular/platform-browser';
import { Camera, CameraOptions } from '@ionic-native/camera';
import {UtilProvider} from '../../providers/util/util';
import * as firebase from 'firebase';
/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  public registerForm: FormGroup;
  public loading: Loading;
  public users;
  storageRef: any;
  public browserVersion = true;
  public imageData: any;
  public downloadUrls = "";
  public imageFlag = false;
  public img_url = null;

  constructor(public navCtrl: NavController, public navParams: NavParams, public authProvider: AuthProvider,
    public loadingCtrl: LoadingController,public domSanitizer: DomSanitizer,
    public alertCtrl: AlertController,public camera: Camera, public platform: Platform,public util:UtilProvider,
    public afDB: AngularFireDatabase,
    formBuilder: FormBuilder) {
      this.storageRef = firebase.storage();
     // this.users = afDB.list('users/');
    this.registerForm = formBuilder.group({
      email: [
        "",
        Validators.compose([Validators.required, EmailValidator.isValid])
      ],

      name: [
        "",
        Validators.compose([Validators.required])
      ],
      password: [
        "",
        Validators.compose([Validators.minLength(6), Validators.required])
      ],
      address: [
        "",
        Validators.compose([Validators.required])
      ],
      phone: [
        "",
        Validators.compose([Validators.minLength(8), Validators.required])
      ]

    });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }
  signUp(){
    if(this.imageFlag == true){
      this.uploadtoStorage();
    }
    else{
      this.signupUser();
    }
  }
  signupUser(): void {

    
    if (!this.registerForm.valid) {
      console.log(
        `Need to complete the form, current value: ${this.registerForm.value}`
      );
    } else {
      const email: string = this.registerForm.value.email;
      const name: string = this.registerForm.value.name;
      const password: string = this.registerForm.value.password;
      const address: string = this.registerForm.value.address;
      const phone: string = this.registerForm.value.phone;
      const image: string=this.downloadUrls;

      //time:Date.now()
      this.authProvider.signupUser(email,name, password, address, phone,image).then(
        user => {
          this.loading.dismiss().then(() => {
         
            //   var cleanString = email.replace(/[\|&;\$%@"<>\(\)\.\+,]/g, "");
            
            // this.users = this.afDB.list('users/'+cleanString);
            // this.users.push({
            //   email: email,
            //   password: password,
            //   address: address,
            //   phone: phone,
            //   time: Date.now()
      
            // })
            this.navCtrl.setRoot(HomePage);
          });
        },
        error => {
          this.loading.dismiss().then(() => {
            const alert: Alert = this.alertCtrl.create({
              message: error.message,
              buttons: [{ text: "Ok", role: "cancel" }]
            });
            alert.present();
          });
        }
      );
      this.loading = this.loadingCtrl.create();
      this.loading.present();
    }
  }

  selectedMedia(files) {
    console.log(files); 
    this.imageData = files[0];
    var obj_url = URL.createObjectURL(this.imageData);
    this.img_url = obj_url;
    console.log(this.img_url);
    console.log(this.imageData);
    this.imageFlag = true;
  }

  uploadtoStorage(){
    let loader = this.util.showLoading('Uploading image');
    loader.present();
    let blobImage = null;
    if(!this.browserVersion)
      blobImage = this.dataURItoBlob(this.imageData);
    else
      blobImage = this.imageData;
    let pname = this.getImageName();
    this.uploadImageToStorage(blobImage,pname)
    .then(data =>{
      console.log(data);
      let temp:any = data;
      if(temp != null){
        this.downloadUrls = temp;
        console.log(this.downloadUrls);
        this.signupUser();
      }
      loader.dismiss();
     
    });
  }

  dataURItoBlob(dataURI){
    let binary = atob(dataURI.split(',')[1]);
    let array = [];
    for (let i = 0; i < binary.length; i++) {
      array.push(binary.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], {type: 'image/jpeg'});
  }

  getImageName(){
    var dt = new Date();
    var seed = dt.getFullYear() + dt.getDay() + dt.getMonth() + dt.getHours() + dt.getMinutes() + dt.getSeconds();
    var holdrand = (seed * 214013 + 2531011); 
    var holdrand2 = (holdrand * 214013 + 2531011); 
    return holdrand2;
  }

  uploadImageToStorage(uploadItem, fileName) {
    let dwnldUrl = '';
    let folder = 'images';
    return new Promise(resolve => {
      try {
        let path = `/${folder}/${fileName}.jpg`;
        var iRef = this.storageRef.ref().child(path);
        iRef.put(uploadItem).then((snapshot) => {
          console.log(snapshot);
          console.log(snapshot.downloadURL);
          dwnldUrl = snapshot.downloadURL;
          resolve(dwnldUrl);
        });
      }
      catch (e) {
        resolve(e.message);
      }
    });
  }

}