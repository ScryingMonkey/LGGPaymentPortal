import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-upeditorder',
  templateUrl: './upeditorder.component.html',
  styleUrls: ['./upeditorder.component.css']
})
export class UpeditorderComponent implements OnInit {
  private orders: Array<String> = new Array();

  constructor() {   }

  ngOnInit() {
    this.orders = ["Order1", "Order2", "Order3"];
  }

  gotoDetail(order){
    console.log('...order:');
    console.log(order);
  }

}
