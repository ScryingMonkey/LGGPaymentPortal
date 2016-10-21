import { Component, OnInit } from '@angular/core';

import { TestService } from '../../services/test.service';

@Component({
  selector: 'app-uptestingfooter',
  templateUrl: './uptestingfooter.component.html',
  styleUrls: ['./uptestingfooter.component.css']
})
export class UptestingfooterComponent implements OnInit {

  constructor( private _test:TestService ) {  }

  ngOnInit() {
  }

}
