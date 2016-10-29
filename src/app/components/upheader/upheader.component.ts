import { Component, OnInit, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ROUTER_DIRECTIVES, Router }   from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { HubService } from '../../services/hub.service';

@Component({
  selector: 'app-upheader',
  templateUrl: './upheader.component.html',
  styleUrls: ['./upheader.component.css'],
  directives: [ROUTER_DIRECTIVES],
  providers: [ ]
})
export class UpheaderComponent implements OnInit {
  @Input() title: string;
  @Input() links: Array<any>; // array of links.  labels are displayed.  address is handed to the router on click.
  public titleClicked = true;
  private user;
  private userName: string;

  constructor(private _as: AuthService, private router: Router, private _hub: HubService) { 
    console.log('[ UpheaderComponent.constructor ]');
    // subscribe to the user object for the app
    this._hub.user$.subscribe(res => this.user = res );
    this._hub.headerLinks$.subscribe(res => this.links = res);
  }

  ngOnInit() {
    console.log('[ UpheaderComponent.ngOnInit() ]');
  }

  onClick(address) { 
    console.log("...in UpheaderComponent.onClick("+address+")");
    if(address === 'logout') {
      this._as.logout();
    }
    this.router.navigate(['/'+address]);
  }
  logout() {
    this._hub.logout();
  }

}
