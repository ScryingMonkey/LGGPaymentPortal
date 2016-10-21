import { Component, OnInit, Input } from '@angular/core';
import { FORM_DIRECTIVES }   from '@angular/forms';

import { Monkey } from './monkey.interface';
import { MonkeySkinComponent } from './monkeyskin/monkeyskin.component';
import { BarrelOfMonkeysService } from './barrelofmonkeys.service';

@Component({
    selector: 'barrel-of-monkeys',
    templateUrl: 'barrelofmonkeys.component.html',
    providers: [BarrelOfMonkeysService],
    directives: [MonkeySkinComponent, FORM_DIRECTIVES]
})
export class BarrelOfMonkeysComponent implements OnInit {
    @Input() bom: Array<any>;

    private monkey: Monkey;

    constructor(private _bomService: BarrelOfMonkeysService) {
        console.log('[ BarrelOfMonkeysComponent.constructor...');
        this._bomService.currentMonkey$.subscribe( monkey => {
            console.log('[ BarrelOfMonkeysComponent.constructor.currentMonkey$.subscribe...');
            //this._bomService.testState();  
            this.monkey = monkey;  // binds monkey in view (monkeySkin) to currentMonkey in monkeyService
            // TODO: Define what should be in monkeySkin and what should be here
        } );             
     }

    ngOnInit() { 
        console.log('[ BarrelOfMonkeysComponent.ngOnInit()...');
        console.log('...bom :');
        console.dir(this.bom);

        if(this.bom != null) {
            this._bomService.importBOM( this.bom );            
        } else {         
            console.log('...bom == null');   
            this._bomService.importBOM( this._bomService.getDummyBOM() );
        }
    }
}