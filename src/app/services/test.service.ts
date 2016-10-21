import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs/subscription';
import { Observable } from 'rxjs/observable';
import { Subject }    from 'rxjs/Subject';
import { BehaviorSubject } from "rxjs/Rx";

@Injectable()
export class TestService {
  private testing: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor() { }

  get testOrders() {
    let orders = [ {name:'Order1', quantity:'1', cost:'$800', status:'PAID'},
                   {name:'Order2', quantity:'2', cost:'$1600', status:'PAID'},
                   {name:'Order3', quantity:'3', cost:'$2400', status:'PAID'}
                  ];
    return orders;
  }

  updateTesting(bool:boolean) {
    this.testing.next(bool);
  }

}
