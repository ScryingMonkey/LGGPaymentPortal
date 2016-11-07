import { Injectable } from '@angular/core';

declare var braintree:any;

@Injectable()
export class PayService {

  constructor() {
  }
   
  sendPayment(method:string) {
        console.log('[ BuyService.sendPayment()...');
        console.log('...sending payment with method: '+method);

    }
}
