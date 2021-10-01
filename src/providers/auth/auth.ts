import { Injectable } from '@angular/core';
import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/database';


/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {
  public logindata;
  constructor() {

  }
  loginUser(email: string, password: string): Promise<any> {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }
  signupUser(email: string,name:string, password: string, address: string, phone: string,image:string): Promise<any> {
    var pin=Date.now();
    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(newUserCredential => {
        newUserCredential.user.updateProfile({displayName:address,photoURL:null})
        firebase
          .database()
          .ref(`/userProfile/${newUserCredential.user.uid}`)
          .set({ email,name, address, phone,image, pin });
      })
      .catch(error => {
        console.error(error);
        throw new Error(error);
      });
  }
  resetPassword(email: string): Promise<void> {
    return firebase.auth().sendPasswordResetEmail(email);
  }
  logoutUser(): Promise<void> {
    const userId: string = firebase.auth().currentUser.uid;
    firebase
      .database()
      .ref(`/userProfile/${userId}`)
      .off();
    return firebase.auth().signOut();
    
  }

 
}

