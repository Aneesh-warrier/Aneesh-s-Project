// import { BrowserModule } from '@angular/platform-browser';
// import { ErrorHandler, NgModule } from '@angular/core';
// import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
// import { SplashScreen } from '@ionic-native/splash-screen';
// import { StatusBar } from '@ionic-native/status-bar';
// import { MyApp } from './app.component';
// import { HomePage } from '../pages/home/home';
// import { AuthProvider } from '../providers/auth/auth';
// import { UserinfoProvider } from '../providers/userinfo/userinfo';
// import { AddPage } from '../pages/add/add';
// import { RegisterPage } from '../pages/register/register';
// import { ResetPasswordPage } from '../pages/reset-password/reset-password';
// import { ShopPage } from '../pages/shop/shop';
// import { SupplierPage } from '../pages/supplier/supplier';
// import { AngularFireModule } from '@angular/fire';
// import { AngularFireAuthModule } from '@angular/fire/auth';
// import { AngularFireDatabaseModule } from '@angular/fire/database';
// import { AngularFirestoreModule } from 'angularfire2/firestore';
// import { firebaseConfig } from './credentials';
// import { ItemsPage } from '../pages/items/items';
// import { IonicStorageModule } from '@ionic/storage';

// import { DataProvider } from '../providers/data/data';
// import { UpQuantityPage } from '../pages/up-quantity/up-quantity';
// import { ShopaddPage } from '../pages/shopadd/shopadd';
// import { NewshopPage } from '../pages/newshop/newshop';

// @NgModule({
//   declarations: [
//     MyApp,
//     HomePage,
//     AddPage,
//     RegisterPage,
//     ResetPasswordPage,
//     ShopPage,
//     SupplierPage,
//     ItemsPage,
//     UpQuantityPage,
//     NewshopPage,
//     ShopaddPage
//   ],
//   imports: [
//     BrowserModule,
//     IonicModule.forRoot(MyApp),
//     AngularFireAuthModule,
//     AngularFireDatabaseModule,
//     AngularFirestoreModule.enablePersistence(),
//     AngularFireModule.initializeApp(firebaseConfig),
//     IonicStorageModule.forRoot()
//   ],
//   bootstrap: [IonicApp],
//   entryComponents: [
//     MyApp,
//     HomePage,
//     AddPage,
//     RegisterPage,
//     ResetPasswordPage,
//     ShopPage,
//     SupplierPage,
//     ItemsPage,
//     UpQuantityPage,
//     ShopaddPage,
//     NewshopPage
//   ],
//   providers: [
//     StatusBar,
//     SplashScreen,
//     { provide: ErrorHandler, useClass: IonicErrorHandler },
//     AuthProvider,
//     UserinfoProvider,  
//     DataProvider

//   ]
// })
// export class AppModule { }
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AuthProvider } from '../providers/auth/auth';
import { UserinfoProvider } from '../providers/userinfo/userinfo';




import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { firebaseConfig } from './credentials';

import { IonicStorageModule } from '@ionic/storage';
import { DataProvider } from '../providers/data/data';

// import { UpQuantityPage } from '../pages/up-quantity/up-quantity';
// import { ShopaddPage } from '../pages/shopadd/shopadd';
// import { NewshopPage } from '../pages/newshop/newshop';
// import { AddPage } from '../pages/add/add';
// import { RegisterPage } from '../pages/register/register';
// import { ResetPasswordPage } from '../pages/reset-password/reset-password';
// import { ShopPage } from '../pages/shop/shop';
// import { SupplierPage } from '../pages/supplier/supplier';
// import { ItemsPage } from '../pages/items/items';

import { UpQuantityPageModule } from '../pages/up-quantity/up-quantity.module';
import { ShopaddPageModule } from '../pages/shopadd/shopadd.module';
import { NewshopPageModule } from '../pages/newshop/newshop.module';
import { AddPageModule } from '../pages/add/add.module';
import { RegisterPageModule } from '../pages/register/register.module';
import { ResetPasswordPageModule } from '../pages/reset-password/reset-password.module';
import { ShopPageModule } from '../pages/shop/shop.module';
import { SupplierPageModule } from '../pages/supplier/supplier.module';
import { ItemsPageModule } from '../pages/items/items.module';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    // AddPage,
    // RegisterPage,
    // ResetPasswordPage,
    // ShopPage,
    // SupplierPage,
    // ItemsPage,
    // UpQuantityPage,
    // NewshopPage,
    // ShopaddPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFirestoreModule.enablePersistence(),
    AngularFireModule.initializeApp(firebaseConfig),
    IonicStorageModule.forRoot(),
    AddPageModule,
    RegisterPageModule,
    ResetPasswordPageModule,
    ShopPageModule,
    SupplierPageModule,
    ItemsPageModule,
    UpQuantityPageModule,
    ShopaddPageModule,
    NewshopPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
    // AddPage,
    // RegisterPage,
    // ResetPasswordPage,
    // ShopPage,
    // SupplierPage,
    // ItemsPage,
    // UpQuantityPage,
    // ShopaddPage,
    // NewshopPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AuthProvider,
    UserinfoProvider,
    DataProvider

  ]
})
export class AppModule { }
