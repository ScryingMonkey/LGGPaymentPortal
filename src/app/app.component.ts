import { Component } from '@angular/core';

import { HubService } from './services/hub.service';
import { OrderService } from './services/order.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = "Local Good's Guide Sponsor Portal";
  links = [  {'label':'Account', 'address':'account'},
             {'label':'Admin', 'address':'admin'}, // for updating pricelist
             {'label':'New Order', 'address':'order'}
           ];
  loggedIn:boolean = false;

  // TODO: import bom from here into BarrelOfMonkeysService
  bom = [ { key:'size', image:'flamingo', blurb:'Size?', optionType:'dropdown', 
                 options:['Full Page','1/2 Page', '1/4 Page', '1/8 Page'], followers:['color'], submit:'Next', hat:'Yellow Boiler' },
               { key:'color', image:'elephant', blurb:'Black & White or Color?', optionType:'dropdown', 
                 options:['Black & White','Color'], followers:[], submit:'Submit', hat:'Blue Trucker Hat' }
              ];

  constructor(private _hub: HubService, private _order:OrderService) { 
    console.log('[ AppComponent.constructor...');
    this._order.updateShowBom$(true);
    this._order.updateBom(this.bom);
    this._hub.updateHeaderLinks$(this.links);
    this._hub.loggedIn$.subscribe(res => this.loggedIn = res);
    }

  ngOnInit() {  }
  
}
