import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs/subscription';
import { Observable } from 'rxjs/observable';
import { Subject }    from 'rxjs/Subject';
import { BehaviorSubject } from "rxjs/Rx";

// import { BarrelOfMonkeysService } from '../components/uporder/barrelofmonkeys/barrelofmonkeys.service';

@Injectable()
export class OrderService {

  public checkoutTitle:string = 'Local Goods Guide Sponsorship';
  private showBom: BehaviorSubject<boolean> = new BehaviorSubject(true);
  private showCheckoutForm: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private monkeyReport: BehaviorSubject<Array<string>> = new BehaviorSubject(Array());
  private invoiceAmount: BehaviorSubject<number> = new BehaviorSubject(107999);
  public bom: Array<any>;
  private title: string;

    constructor() { 
    console.log('[ OrderService.constructor...');
  }

  // Getters
  get showBom$() { return this.showBom.asObservable(); }
  get showCheckoutForm$() { return this.showCheckoutForm.asObservable(); }
  get monkeyReport$() { return this.monkeyReport.asObservable(); }
  get totalInvoice$() { return this.invoiceAmount.asObservable(); }
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
    console.log('[ OrderService.updateBom...');
    this.bom = bom; 
    console.log('...bom :');
    console.dir(this.bom); 
  }
  updateMonkeyReport(monkeyReport:Array<string>) {
    this.monkeyReport.next(monkeyReport);
    console.log('...received monkeyReport:');
    console.dir(monkeyReport);
    //TODO: Uncomment this when calculateInvoiceAmount works
    //this.updateInvoiceAmount(this.calculateInvoiceAmount(monkeyReport));
  }
  updateInvoiceAmount(amount:number) {this.invoiceAmount.next(amount);}
  calculateInvoiceAmount(monkeyReport) { 
      let amount = 0;
      //TODO: Calculate invoiceTotal from pricing sheet from OrderService
      return amount;
  }

}
