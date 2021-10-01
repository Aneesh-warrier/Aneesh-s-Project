import { Component } from '@angular/core';
import { Platform, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import firebase from 'firebase';
import 'firebase/auth';
import { firebaseConfig } from './credentials';
import { Storage } from '@ionic/storage';
import { UserinfoProvider } from '../providers/userinfo/userinfo';

import { HomePage } from '../pages/home/home';

// import { UpQuantityPage } from '../pages/up-quantity/up-quantity';
//import { FcmProvider } from '../providers/fcm/fcm';
import { ToastController } from 'ionic-angular';
import { Subject } from 'rxjs/Subject';
import { tap } from 'rxjs/operators';
//import { Push, PushObject, PushOptions } from '@ionic-native/push';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = HomePage;

  constructor(platform: Platform, toastCtrl: ToastController, statusBar: StatusBar, splashScreen: SplashScreen, public storage: Storage, public userinfo: UserinfoProvider, public alertCtrl: AlertController) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
      }
      this.initializeApp();
      

      statusBar.styleDefault();
      splashScreen.hide();
      //this.pushsetup();
      // fcm.getToken()
      //  fcm.listenToNotifications().pipe(
      //   tap(msg => {
      //     // show a toast
      //     const toast = toastCtrl.create({
      //       message: msg.body,
      //       duration: 3000
      //     });
      //     toast.present();
      //   })
      // )
      // .subscribe()
    });
  }
  // pushsetup() {
  //   const options: PushOptions = {
  //    android: {
  //        senderID: '851131927937'
  //    },
  //    ios: {
  //        alert: 'true',
  //        badge: true,
  //        sound: 'false'
  //    },
  //    windows: {}
  // };

  //const pushObject: PushObject = this.push.init(options);

  //   pushObject.on('notification').subscribe((notification: any) => {
  //     if (notification.additionalData.foreground) {
  //       let youralert = this.alertCtrl.create({
  //         title: 'New Push notification',
  //         message: notification.message
  //       });
  //       youralert.present();
  //     }
  //   });

  //   pushObject.on('registration').subscribe((registration: any) => {
  //      //do whatever you want with the registration ID
  //   });
  //   pushObject.on('error').subscribe(error => alert('Error with Push plugin' + error));
  // }
  initializeApp() {
    // console.log(firebase.auth().currentUser);
    // if(firebase.auth().currentUser){
    //   this = .rootPage = ShopPage;
    // }
    // else{
    //   this.rootPage = HomePage;
    // }
    var pthis = this;
    firebase.auth().onAuthStateChanged(function (currentUser) {

      if (currentUser) {
        //console.log(currentUser);
        //this.navCtrl.setRoot(ShopPage);
        pthis.storage.get('userdetails').then(data => {
         // console.log(data);
          let temp: any = data;
          if (temp != null) {
            pthis.userinfo.uderdetails.type = temp.type;

            if (temp.type == "Supplier") {
              // pthis.rootPage = UpQuantityPage;
            }
            else {
            
            }
          }
        })

        // User is signed in.
      }
      
      else {
        // No user is signed in.
        //this.navCtrl.setRoot(HomePage);
        pthis.rootPage = HomePage;
      }
    });
  }
}

