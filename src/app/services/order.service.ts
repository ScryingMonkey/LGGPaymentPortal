import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs/subscription';
import { Observable } from 'rxjs/observable';
import { Subject }    from 'rxjs/Subject';
import { BehaviorSubject } from "rxjs/Rx";
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';

@Injectable()
export class OrderService {

  private showBom: BehaviorSubject<boolean> = new BehaviorSubject(true);
  private showCheckoutForm: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private monkeyReport: BehaviorSubject<Array<string>> = new BehaviorSubject(Array());
  private invoiceAmount: BehaviorSubject<number> = new BehaviorSubject(107999);
  private title: string;
  private priceList;

  public bom: Array<any>;
  public checkoutTitle:string = 'Local Goods Guide Sponsorship';

  constructor(private _af:AngularFire) { 
    console.log('[ OrderService.constructor...');
    this._af.database.object('/PriceList/').subscribe(res => this.priceList = res);
  }

  // Getters
  get showBom$() { return this.showBom.asObservable(); }
  get showCheckoutForm$() { return this.showCheckoutForm.asObservable(); }
  get monkeyReport$() { return this.monkeyReport.asObservable(); }
  get totalInvoice$() { return this.invoiceAmount.asObservable(); }
  getOrders(userId) {
    let orders = this._af.database.list('/users/'+userId+'/orders/');
    console.log('...OrderService.getOrders.orders: '+orders);
    console.log(orders);
    return orders;
  }

  // Setters
  updateShowBom$(state:boolean) { 
      this.showBom.next(state); 
      console.log('...showBom :'+this.showBom.value);
  }
  updateShowCheckoutForm$(state:boolean) { 
      this.showCheckoutForm.next(state); 
      console.log('...showCheckoutForm :'+this.showCheckoutForm.value);
  }
  updateBom(bom) { 
    // console.log('[ OrderService.updateBom...');
    this.bom = bom; 
    // console.log('...bom :');
    // console.dir(this.bom); 
  }
  updateMonkeyReport(monkeyReport:Array<string>) {
    this.monkeyReport.next(monkeyReport);
    console.log('...updated monkeyReport:');
    console.dir(monkeyReport);
    this.updateInvoiceAmount(this.calculateInvoiceAmount(monkeyReport));
    
  }
  updateInvoiceAmount(amount:number) {
      this.invoiceAmount.next(amount);
  }
  
  //Helpers
  calculateInvoiceAmount(monkeyReport) { 
      console.log('[ OrderService.calculateInvoiceAmount...');
      let amount = 0;
      //TODO: Calculate invoiceTotal from pricing sheet from OrderService
      let size = monkeyReport[0];
      switch (size) {
          case 'Full Page': size = "whole";  break;
          case '1/2 Page': size = "half";  break;
          case '1/4 Page': size = "quarter";  break;
          case '1/8 Page': size = "eighth";  break;
      }
      let color = monkeyReport[1];
      switch (color) {
          case 'Black & White': color = 'BlackAndWhite'; break;
          case 'Color': color = 'Color'; break;
      }

      console.log('...this.priceList: ');
      console.dir(this.priceList);
      amount = this.priceList.Print[color][size];
      console.log('...this.priceList.Print[color]: '+this.priceList.Print[color]);      
      console.log('...amount: '+amount);

      return amount;
  }
  sendOrderToFirebase(ccData, userId, userEmail) {
      console.log('[ OrderService.sendOrder...');      
      let afOrder = {
        orderNumber: '77777',
        cost: this.invoiceAmount.value,
        status: 'PAID',
        ccData: ccData,
        // add user info to afOrder
        userId: userId,
        userEmail: userEmail,
        // add monkeyReport to afOrder
        //TODO: refactor monkeyReport to us an object instead of an array
        size: this.monkeyReport.value[0],
        color: this.monkeyReport.value[1]
        }
     
      console.log('...afOrder: ' +afOrder );
      console.dir(afOrder);
      // send afOrder to firebase
      this._af.database.list('/users/'+userId+'/orders/').push(afOrder);
      // _hub navigates view to accouts upon completion
  }

}