
import { RouterConfig } from '@angular/router';
import { UpaccountComponent } from './components/upaccount/upaccount.component';
import { UpeditorderComponent } from './components/upeditorder/upeditorder.component';
import { UploginComponent } from './components/uplogin/uplogin.component';
import { UporderComponent } from './components/uporder/uporder.component';

export const UpAppRoutes: RouterConfig = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: UploginComponent },
    { path: 'loggedin', component: UpaccountComponent },
    { path: 'account', component: UpaccountComponent },
    { path: 'editorder', component: UpeditorderComponent },
    { path: 'order', component: UporderComponent },
    { path: '**', redirectTo: '/login', pathMatch: 'full' }
];

import { RouterModule }   from '@angular/router';