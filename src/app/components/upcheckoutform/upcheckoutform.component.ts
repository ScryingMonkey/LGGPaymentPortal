import {Component, OnInit, OnDestroy, APPLICATION_COMMON_PROVIDERS, Input } from '@angular/core';
import { FORM_DIRECTIVES } from '@angular/common';

import { HubService } from '../../services/hub.service';
import { TestService } from '../../services/test.service';
// import { BarrelOfMonkeysService } from '../barrelofmonkeys/barrelofmonkeys.service';


@Component({
  selector: 'upcheckoutform',
  providers: [APPLICATION_COMMON_PROVIDERS],
  templateUrl: 'upcheckoutform.component.html',
  styleUrls: ['upcheckoutform.component.css'],
  directives: [],
  pipes: []
})

export class UpCheckoutForm implements OnInit, OnDestroy  {
    public showTitle: boolean = true;
    public showAmount: boolean = true;
    public showForm: boolean = true;
    public showSummary: boolean = true;
    
    @Input() title:string;
    private summary: string = '';
    private totalInvoice: number = 0;
    private ccData = { ccNumber:'333-333-333-333-333', 
                        ccExpiry: '10/33',
                        ccCvc: '333'};

    constructor( private _hub:HubService, private _test:TestService ) { 
        // binds monkeyReport value to monkeyReport value in OrderService
        this._hub.monkeyReport$.subscribe( res => this.summary = this.updateSummary(res));
        // binds totalInvoice value to monkeyReport value in OrderService
        this._hub.totalInvoice$.subscribe( res => this.totalInvoice = res);
    }
    ngOnInit() { 
        console.log('[ UpCheckoutForm.ngOnInit...'); 
    }
    ngOnDestroy() {
        console.log('[ UpCheckoutForm.ngOnDestroy...');
    }
    submitForm() {
        console.log('...form submitted');
        this._hub.submitOrder(this.CCData);
    }
    get CCData(){ return [this.ccData.ccNumber, this.ccData.ccExpiry, this.ccData.ccCvc]; }

    updateSummary(monkeyReport) {
        let summary = '';
        for(let m of monkeyReport){
            summary = summary+m+',  ' ;
        }
        summary = summary.slice(0,summary.length-3);
        return summary;
    }
    // TODO: For testing.  Remove when working.
    get testingCCData() { 
        return JSON.stringify(this.ccData); }
}