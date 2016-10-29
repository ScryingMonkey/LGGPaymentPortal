import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs/subscription';
import { Observable } from 'rxjs/observable';
import { Subject }    from 'rxjs/Subject';
import { BehaviorSubject } from "rxjs/Rx";

import { HubService } from './hub.service';


@Injectable()
export class TestService {
  private testing: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private _hub: HubService) { }

  testUser() {
    console.log('..._test.testUser:userData:');
    console.dir(this._hub._as.userData);
  }

  get user$() { return this._hub._as.user$; }
  
  get testOrders() {
    let orders = [ {number:'00001', quantity:'1', cost:'$800', status:'PAID'},
                   {number:'00002', quantity:'2', cost:'$1600', status:'PAID'},
                   {number:'00003', quantity:'3', cost:'$2400', status:'PAID'}
                  ];
    return orders;
  }
  get testingUser() {
    return JSON.stringify(this._hub._as.user$); }

  updateTesting(bool:boolean) {
    this.testing.next(bool);
  }
  

}
