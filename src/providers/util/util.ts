import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { LoadingController, ToastController, AlertController } from 'ionic-angular';
import 'rxjs/add/operator/map';

/*
  Generated class for the UtilProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UtilProvider {

  constructor(public http: Http, public loadingCtrl: LoadingController, public toastCtrl: ToastController, public alertCtrl: AlertController) {
    console.log('Hello UtilProvider Provider');
  }

  showLoading(message){
    let loader = this.loadingCtrl.create({
      content: message,
      enableBackdropDismiss:true
    });
    return loader;
  }

  presentToast(msg) {
   let toast = this.toastCtrl.create({
     message: msg,
     duration: 1000
   });
   toast.present();
  }

  presentLongToast(msg,pos) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 1500,
      position: pos
    });
    toast.present();
   }

   showAlertMessage(title,message){
    const alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
   }

  

}
