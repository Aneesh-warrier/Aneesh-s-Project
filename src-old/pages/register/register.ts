import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Alert, AlertController, Loading, LoadingController } from "ionic-angular";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthProvider } from "../../providers/auth/auth";
import { EmailValidator } from "../../validators/email";
import { HomePage } from "../home/home";
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

  constructor(public navCtrl: NavController, public navParams: NavParams, public authProvider: AuthProvider,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    formBuilder: FormBuilder) {
    this.registerForm = formBuilder.group({
      email: [
        "",
        Validators.compose([Validators.required, EmailValidator.isValid])
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
  signupUser(): void {
    if (!this.registerForm.valid) {
      console.log(
        `Need to complete the form, current value: ${this.registerForm.value}`
      );
    } else {
      const email: string = this.registerForm.value.email;
      const password: string = this.registerForm.value.password;
      const address: string = this.registerForm.value.address;
      const phone: string = this.registerForm.value.phone;
      //time:Date.now()
      this.authProvider.signupUser(email, password, address, phone).then(
        user => {
          this.loading.dismiss().then(() => {
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
}