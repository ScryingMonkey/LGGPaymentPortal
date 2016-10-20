import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { UpheaderComponent } from './upheader/upheader.component';
import { UploginComponent } from './uplogin/uplogin.component';
import { UporderComponent } from './uporder/uporder.component';
import { UptestingfooterComponent } from './uptestingfooter/uptestingfooter.component';
import { UpheaderComponent } from './components\upheader/upheader.component';
import { UporderComponent } from './components\uporder/uporder.component';
import { UploginComponent } from './components\uplogin/uplogin.component';
import { UpaccountComponent } from './components\upaccount/upaccount.component';
import { UpeditorderComponent } from './components\upeditorder/upeditorder.component';
import { UptestingfooterComponent } from './components\uptestingfooter/uptestingfooter.component';

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
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
