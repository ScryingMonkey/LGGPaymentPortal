import { Injectable } from '@angular/core';
import {Subscription} from 'rxjs/subscription';
import {Observable} from 'rxjs/observable';
import { Subject }    from 'rxjs/Subject';
import { BehaviorSubject } from "rxjs/Rx";
import { Router }   from '@angular/router';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';

import { AuthService } from './auth.service';
import { OrderService } from './order.service';
import { PayService } from './pay.service';

@Injectable()
export class HubService {

  private headerLinks: BehaviorSubject<Array<any>> = 
                          new BehaviorSubject([{'title':'default', 'address':'blah'}]);
  private lastLink: Object = {'label':'Log Out', 'address':'logout'};
  private monkeyReport: any;

  public isLoggedIn: boolean = false;
  public user: any;

  constructor(public _af:AngularFire,
              public _as:AuthService, 
              public _order:OrderService, 
              public _pay:PayService,
              public router:Router) { 
    console.log('[ HubService.constructor...');
    this._as.isLoggedIn$.subscribe(res => this.isLoggedIn = res );
    this._as.user$.subscribe(res => this.user = res );
    this._order.monkeyReport$.subscribe(res => this.monkeyReport = res);

    this.user = this._as.dummyUser;
  }

  // Helper methods
  navigate(address:string) {
    this.router.navigate([address]);
  }
  logout() {
    console.log("...HubService.logout()");
    this._as.logout();
    this.router.navigate(['/logout']);
  }
  submitOrder(ccData) { 
    console.log('...HubService.sendOrder.uid: '+this.user.uid);
    this._order.sendOrderToFirebase(ccData, this.user.uid, this.user.email);
    console.log('...order sent.  redirecting to /loggedIn');
    this.router.navigate(['/account']);
    this.updateShowBom(true);
    this.updateShowCheckoutForm(false);
  }

  // Getters
  get headerLinks$():Observable<Array<any>> { return this.headerLinks.asObservable(); }
  get loggedIn$():Observable<boolean> {return this._as.isLoggedIn$;}
  get user$():Observable<any> { return this._as.user$; }

  get showBom$() { return this._order.showBom$; }
  get showCheckoutForm$() { return this._order.showCheckoutForm$; }
  get checkoutTitle() { return this._order.checkoutTitle; }
  get monkeyReport$() { return this._order.monkeyReport$; }
  get totalInvoice$() { return this._order.totalInvoice$; }
  get orders() {
    console.log('...HubService.getOrders.userId: '+this.user.uid);
    return this._order.getOrders(this.user.uid);
  }
  updateShowBom(bool:boolean) { this._order.updateShowBom$(bool); }
  updateShowCheckoutForm(bool:boolean) { this._order.updateShowCheckoutForm$(bool); }

  // Setters
  updateHeaderLinks$(links:Array<any>) { 
    // set the last link (Input from parent) in links to "Log Out"
    links.push(this.lastLink);
    // update headerLinks to new list
    this.headerLinks.next(links); 
  }
  updateMonkeyReport(report) {
    this._order.updateMonkeyReport(report);
  }
  

}
