import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2';
import { RouterModule }   from '@angular/router';

import { AppComponent } from './app.component';
import { UpAppRoutes } from './app.route';
import { UpheaderComponent } from './components/upheader/upheader.component';
import { UporderComponent } from './components/uporder/uporder.component';
import { UploginComponent } from './components/uplogin/uplogin.component';
import { UpaccountComponent } from './components/upaccount/upaccount.component';
import { UpeditorderComponent } from './components/upeditorder/upeditorder.component';
import { UptestingfooterComponent } from './components/uptestingfooter/uptestingfooter.component';

import { AuthService } from './services/auth.service';
import { PayService } from './services/pay.service';
import { TestService } from './services/test.service';
import { OrderService } from './services/order.service';
import { HubService } from './services/hub.service';

// Must export the config
export const firebaseConfig = {
    apiKey: "AIzaSyB26Bx-UpCewEX6ilv4uHJ7fEUmaG6yVuY",
    authDomain: "localgoodsguide-7ce3f.firebaseapp.com",
    databaseURL: "https://localgoodsguide-7ce3f.firebaseio.com",
    storageBucket: "localgoodsguide-7ce3f.appspot.com",
    messagingSenderId: "652162984255"
    // apiKey: "AIzaSyD-XIYtmEXlQMy4uufzp_Mrxai253u_6fE",
    // authDomain: "project-3617555751812177585.firebaseapp.com",
    // databaseURL: "https://project-3617555751812177585.firebaseio.com",
    // storageBucket: "project-3617555751812177585.appspot.com"
};

@NgModule({
  declarations: [
    AppComponent,
    UpheaderComponent,
    UploginComponent,
    UporderComponent,
    UptestingfooterComponent,
    UpheaderComponent,
    UporderComponent,
    UploginComponent,
    UpaccountComponent,
    UpeditorderComponent,
    UptestingfooterComponent
  ],
  imports: [ BrowserModule, FormsModule, HttpModule,
    AngularFireModule.initializeApp(firebaseConfig),
    RouterModule.forRoot(UpAppRoutes)
  ],
  providers: [AuthService, PayService, OrderService, TestService, HubService],
  bootstrap: [AppComponent]
})
export class AppModule { }
