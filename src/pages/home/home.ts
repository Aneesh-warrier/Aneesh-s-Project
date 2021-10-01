import { Component, ViewChild } from '@angular/core';
import { NavController, AlertController, RadioGroup } from 'ionic-angular';
import { RegisterPage } from '../register/register';

import { Alert, Loading, LoadingController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailValidator } from '../../validators/email';
import { AuthProvider } from '../../providers/auth/auth';
import { ResetPasswordPage } from '../reset-password/reset-password';
import { UserinfoProvider } from '../../providers/userinfo/userinfo';
import { Storage } from '@ionic/storage';
// import { UpQuantityPage } from '../up-quantity/up-quantity';
import { DataProvider } from '../../providers/data/data';
import {UserPage} from '../user/user';
import { AngularFireDatabase } from '@angular/fire/database';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public loginForm: FormGroup;
  public loading: Loading;
  public adminFlag = false;
  public logindata;
  @ViewChild('username') uname;
  @ViewChild('password') password;
  remember = false;
  constructor(public navCtrl: NavController,public afDB: AngularFireDatabase, public alertCtrl: AlertController, public loadingCtrl: LoadingController,
    public authProvider: AuthProvider,
    public userInfo: UserinfoProvider,

    formBuilder: FormBuilder, private storage: Storage, public d: DataProvider) {
    this.storage.get('remember').then(data => {
      if (data != null) {
        console.log(data);
        this.remember = true;
        this.loginForm.get('email').setValue(data.email);
        this.loginForm.get('password').setValue(data.password);
      }
    });

    this.loginForm = formBuilder.group({
      email: [
        '',
        Validators.compose([Validators.required, EmailValidator.isValid])
      ],
      password: [
        '',
        Validators.compose([Validators.required, Validators.minLength(8)])
      ],
      module: [
        '',
        Validators.compose([Validators.required])
      ]
    });
  }
  goToSignup() {
    this.navCtrl.push(RegisterPage);
  }

  goToResetPassword() {
    this.navCtrl.push(ResetPasswordPage);
  }
  loginUser(): void {
    if (!this.loginForm.valid) {
      console.log(
        `Form is not valid yet, current value: ${this.loginForm.value}`
      );
    } else {
      const email = this.loginForm.value.email;
      const password = this.loginForm.value.password;
      const module = this.loginForm.value.module;
      if(this.adminFlag!=true){
        this.authProvider.loginUser(email, password).then(
          authData => {
  
            this.loading.dismiss().then(() => {
              this.userInfo.uderdetails.type = module;
              this.userInfo.uderdetails.email = email;
              this.userInfo.uderdetails.password = password;
              this.storage.set('userdetails', this.userInfo.uderdetails);
              console.log(authData);
              if (this.remember == true) {
                this.storage.set('remember', this.userInfo.uderdetails);
              }
              else {
                this.storage.remove('remember');
              }
             
              //if (this.userInfo.uderdetails.type == 'kitchen') {
  
                this.navCtrl.setRoot(UserPage);
              //}
              //else {
  
              //  this.navCtrl.setRoot(UpQuantityPage);
              //}
  
            });
          },
          error => {
            this.loading.dismiss().then(() => {
              const alert: Alert = this.alertCtrl.create({
                message: error.message,
                buttons: [{ text: 'Ok', role: 'cancel' }]
              });
              alert.present();
            });
          }
        );
        this.loading = this.loadingCtrl.create();
        this.loading.present();
      }
      else{
        this.logindata = this.afDB.list('admin/');
        this.logindata.snapshotChanges().subscribe(item => {
            let details = { "key": item.key, "email": item.payload.val().email, "password": item.payload.val().password }
          if(details.email==email && details.password==password){
            this.navCtrl.setRoot(UserPage);
          }
          else{

          }
        })

      }
    }
      
  }

  gotoAdmin(){
    this.adminFlag = true;
  }
}
