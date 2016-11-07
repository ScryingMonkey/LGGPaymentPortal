import { Component, OnInit, Input} from '@angular/core';

@Component({
    selector: 'order-detail-fragment',
    styleUrls: ['./upaccount.component.css'],
    templateUrl: ``
})
export class OrderDetailFragment implements OnInit {
    @Input() order;
    constructor() { }

    ngOnInit() { }
}