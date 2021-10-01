import { Injectable } from '@angular/core';

/*
  Generated class for the UserinfoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserinfoProvider {
  uderdetails={email:'',password:'',address:'',phone:'',type:''};

  constructor() {
    console.log('Hello UserinfoProvider Provider');
  }

}
