import { Component, OnInit, Input } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
import { AngularFire, FirebaseAuth, AuthProviders, AuthMethods } from 'angularfire2';
import {Observable} from 'rxjs/observable';
import { Subject }    from 'rxjs/Subject';
import { Router }   from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { TestService } from '../../services/test.service';
import { HubService } from '../../services/hub.service';

@Component({
  selector: 'app-uplogin',
  templateUrl: './uplogin.component.html',
  styleUrls: ['./uplogin.component.css'],
  directives: []
})
export class UploginComponent implements OnInit {  
  private listTitle: string;
  private liTitleKey: string;
  private auth: Subject<any>;
  private userName: string;
  public isLoggedIn: boolean;
  
  constructor(public _as: AuthService, public af: AngularFire, public router: Router, private _test:TestService) {
    console.log('[ UploginComponent.constructor');
    _as.isLoggedIn$.subscribe(isLoggeIn => this.isLoggedIn = isLoggeIn);
  }

  ngOnInit() { 
    if(this.isLoggedIn) {
      console.log('...already logged in.  Redirecting...');
      this.router.navigate( ['/loggedin'] );
    }
  }
  loginWithEmail() {  }
  loginWithGoogle() { this._as.loginWithGoogle(); }
  loginWithFacebook() { this._as.loginWithFacebook(); }
  logout() { this._as.logout(); }
  loginTester() { this._as.loginTester(); }

}