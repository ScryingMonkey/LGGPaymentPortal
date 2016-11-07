import { Component, OnInit } from '@angular/core';

import { TestService } from '../../services/test.service';
import { HubService } from '../../services/hub.service';
import { OrderService } from '../../services/order.service';
import { AuthService } from '../../services/auth.service';

import { OrderFragmentComponent } from './ordersfragment.component';
import { UpCheckoutForm } from '../upcheckoutform/upcheckoutform.component';
import { OrderDetailFragment } from './orderdetailfragment.component';


@Component({
  selector: 'app-upaccount',
  templateUrl: './upaccount.component.html',
  styleUrls: ['./upaccount.component.css'],
  providers: [OrderFragmentComponent, UpCheckoutForm, OrderDetailFragment]
})
export class UpaccountComponent implements OnInit {
  private orders; //:Array<any> = new Array();
  private user

  constructor(private _test:TestService, private _hub:HubService) { }

  ngOnInit() {
    console.log('[ UpaccountComponent.ngOnInit()...');    
    this.orders = this._hub.orders;

    //pull user data for display
    this._hub.user$.subscribe(res => this.user=res );

    if(!this._hub.isLoggedIn) {
      console.log('...not logged in.  Redirecting...');
      this._hub.navigate('/login');
    }
  }
  gotoDetail(order:Object){
    console.log('...order:');
    console.log(order);
    let msg = 'Order: ';
    for (let key of Object.keys(order)) { msg = msg + ", " + key + ": " + order[key]; }
    alert(msg);
  }

}
