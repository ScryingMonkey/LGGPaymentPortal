import { Component, OnInit } from '@angular/core';

import { TestService } from '../../services/test.service';

@Component({
  selector: 'app-upaccount',
  templateUrl: './upaccount.component.html',
  styleUrls: ['./upaccount.component.css']
})
export class UpaccountComponent implements OnInit {
  private orders:Array<any> = new Array();

  constructor(private test:TestService) { }

  ngOnInit() {
    this.orders = this.test.testOrders;
  }

}
