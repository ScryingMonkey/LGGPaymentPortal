import { Injectable } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
import { AngularFire, FirebaseAuth, AuthProviders, AuthMethods } from 'angularfire2';
import {Subscription} from 'rxjs/subscription';
import {Observable} from 'rxjs/observable';
import { Subject }    from 'rxjs/Subject';
import { BehaviorSubject } from "rxjs/Rx";
import { Router }   from '@angular/router';

@Injectable() 
export class AuthService {
  // public auth$: Subject<any>;
  private user: BehaviorSubject<Object> = new BehaviorSubject({});
  private userName: BehaviorSubject<string> = new BehaviorSubject('???');
  private userListData: BehaviorSubject<any> = new BehaviorSubject({});
  private isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject(false);
  // private userPictureURL: BehaviorSubject<string> = new BehaviorSubject(
  //                           "http://png.clipart.me/graphics/thumbs/103/crash-test-dummy_103003187.jpg");
  private userPictureURL: string = "http://png.clipart.me/graphics/thumbs/103/crash-test-dummy_103003187.jpg";

  private userHasPicture: boolean = false;
  private userPictureKey: string = 'none';
  private liDetailKeys: Array<string> = new Array('displayName', 'email');

  constructor(public _af: AngularFire, public router: Router) {
    console.log('[ AuthService.constructor');
    // this.auth$ = _af.auth;
    this._af.auth.subscribe(auth => {
      console.log("[ AuthService.constructor._af.auth.subscription");
      if(auth) {
        console.log('...auth == true, updating user data, user:');
        console.log(auth.auth);
        this.user.next(auth.auth);
        this.updateUserData(auth.auth);
        this.router.navigate( ['/loggedin'] );
        console.log( "......Logged in!  user: " + auth.auth.displayName );
        console.dir( auth.auth );
      } else { 
        console.log( '......not logged in' );
        this.user.next( null );
        this.userName.next( "Please Log In" );
        this.isLoggedIn.next( false );
        this.router.navigate( ['/logout'] );
      }
    });  
  }

  loginWithFacebook() {
    this._af.auth.login({
      provider: AuthProviders.Facebook,
      method: AuthMethods.Popup,
    });
    this.liDetailKeys = ['displayName', 'email'];
    this.userHasPicture = true;
    this.userPictureKey = 'photoURL';
    console.log('Logged in user with Facebook :');
  }

  loginWithGoogle() {
    this._af.auth.login({
      provider: AuthProviders.Google,
      method: AuthMethods.Popup,
    });
    this.liDetailKeys = ['displayName', 'email'];
    this.userHasPicture = true;
    this.userPictureKey = 'photoURL';
    console.log('...Logged in user with Google :');
  }

  logout() {
      console.log("[ AuthService.logout()");
      this._af.auth.logout();
      this.user.complete();
      this.userName.next('Dummy User');
      this.isLoggedIn.next(false);
      this.userPictureURL = "http://png.clipart.me/graphics/thumbs/103/crash-test-dummy_103003187.jpg";
      this.userHasPicture = true;
      this.userPictureKey = 'none';
      this.liDetailKeys = null;
      console.log("...isLoggedIn == " + this.isLoggedIn.value);   
  }

  loginTester() {
    console.log("[ AuthService testing method");
    console.log("......isLoggedIn == " + this.isLoggedIn.value);
    console.log("......logged in user :"+this.userName.value);
    if(this.isLoggedIn.value) { console.dir(this.user.value);
    } else { console.log('......no user'); }
  }
  updateUserData(user) {
    let userPicKeys = ['photoURL'];
    console.log('[ AuthService.updateUserData');
    this.userName.next( user.displayName );
    this.isLoggedIn.next( true );
    console.log('...userHasPicture :' +this.userHasPicture+ ', userPictureKey : '+this.userPictureKey);
    if(this.userHasPicture) {
      console.log('...userPictureURL :' +user[this.userPictureKey]); 
      // this.userPictureURL.next( user[this.userPictureKey] ); 
      this.userPictureURL = user[this.userPictureKey];
    }
    for (let key of userPicKeys) {
      if(user[key]) {
        console.log('...user has picture, key :'+key);
        this.userPictureKey = key;
        this.userPictureURL = user[key];
        console.log('...userPictureURL : '+this.userPictureURL);
      } else {
        console.log('...user does not have picture, key :'+key);
        console.log(user);        
      } 
    }
    this.userListData.next( this.parseUserListData( user, this.liDetailKeys ) );
    console.log('...user data updated:');
    console.log(user);
  }

  // Must return an object that fits listdata.interface
  //     listTitle: string : 'Test Data'
  //     userPictureURL: string : 'https://somepicture.jpg',
  //     liTitleKey: string : 'liTitle' 
  //     liDetailKeys: Array<string> : [ 'detail1', 'detail2', 'detail3']
  //     liItems: Array<Object> : [{'liTitle': 'liTitle3' , 'detail1':10485, 'detail2':3409, 'detail3':245}]
  parseUserListData(user, userDetailKeys: Array<string>) {
    console.log('[ AuthService.parseUserListData');
    // Define fields
    let listTitle: string = 'User Details';
    let userPictureURL: string = user[this.userPictureKey];
    let liTitleKey: string = 'liTitle';
    let liDetailKeys: Array<string> = [];
    let liItems: Array<Object> = [];
    // Define output object
    let listData: Object = {};
    // Populate liItems array
    // listData is designed to list several objects with associated details.
    // For this use, listItems should be an array of objects, each with a single element
    // with a key of liTitle.
    for(let key of userDetailKeys) {
       if(user[key]) {
         liItems.push( { [key]: user[key]} ); 
       }
    }
    // Build dataList object
    listData = {'listTitle': listTitle,
                'userPictureURL': userPictureURL,   
                'liTitleKey': liTitleKey,
                'liDetailKeys': liDetailKeys,
                'liItems': liItems 
              };
    // Print new object to console
    console.log('...parseUserListData complete, listData :');
    console.dir(listData);
    return listData;
  }
  // Getters
  get user$() { return this.user.asObservable(); }
  get userName$() { return this.userName.asObservable(); }
  get isLoggedIn$() { return this.isLoggedIn.asObservable(); }
  get userListData$() { return this.userListData.asObservable(); }
  // get userPictureURL$() { return this.userPictureURL.asObservable(); }
  
}
