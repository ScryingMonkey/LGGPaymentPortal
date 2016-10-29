import { Component, OnInit } from '@angular/core';

import { TestService } from '../../services/test.service';
import { HubService } from '../../services/hub.service';
import { OrderService } from '../../services/order.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-upaccount',
  templateUrl: './upaccount.component.html',
  styleUrls: ['./upaccount.component.css']
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
  gotoDetail(order){
    console.log('...order:');
    console.log(order);
    let msg = 'Order '+ order.number+': '+'Quantity: '+order.quantity+
              ', Cost: '+order.cost+', Status: '+order.status ;
    alert(msg);
  }

}
