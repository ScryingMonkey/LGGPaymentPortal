import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = "Local Good's Guide Sponsor Portal";
  links = [  {'label':'Account', 'address':'account'},
                  {'label':'Orders', 'address':'order'},
                  {'label':'Log In', 'address':'login'}
               ];

  // TODO: import bom from here into BarrelOfMonkeysService
  bom = [ { key:'first', image:'flamingo', blurb:'Would you say that this image is of a flamingo?', optionType:'button', 
                 options:['yes','no'], followers:['second'], submit:'Next', hat:'Yellow Boiler' },
               { key:'second', image:'elephant', blurb:'Would you say that this image is of a elephant?', optionType:'button', 
                 options:['yes','no'], followers:['third'], submit:'Next', hat:'Blue Trucker Hat' },
               { key:'third', image:'dollar', blurb:'Would you like to give me five dollars?', optionType:'button', 
                 options:['yes','no'], followers:[], submit:'Next', hat:'Blue Top Hat' },          
              ];
  
}
