import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'orders-fragment',
    styleUrls: ['./upaccount.component.css'],
    template: `<h1 class="display-2">Orders</h1>
    <ul class="list-group">
      <!--<li (click)="gotoDetail(order)" class="module order">-->
      <li *ngFor="let order of orders | async"
          (click)="gotoDetail(order)" 
          class="order list-group-item">
        
        <div class="row">
          <div class='col-xs-12'> 
            <h3>{{order.size}} {{order.color}} Ad</h3>
          </div>
        </div>
        <div class="row">
          <div class='col-xs-4'>
            Order Number: {{ order.orderNumber }}
          </div>
          <div class='col-xs-4'>
            Cost: {{ order.cost | currency:'USD':true }}
          </div>
          <div class='col-xs-4'> 
              Status: {{ order.status }}
          </div>
        </div>
        <br>
      </li>
      <br>
    </ul>`
})
export class OrderFragmentComponent implements OnInit {
    @Input() orders;

    constructor() { }

    ngOnInit() { }
}