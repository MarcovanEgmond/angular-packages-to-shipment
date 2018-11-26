import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PackagedataService } from './packagedata.service';

import { AppComponent } from './app.component';
import { MainheaderComponent } from './mainheader/mainheader.component';
import { PackageformComponent } from './packageform/packageform.component';
import { PackageoverviewComponent } from './packageoverview/packageoverview.component';
import { ReplacePipe } from './custompipes/replacepipe.pipe';
import { CustomcurrencyPipe } from './custompipes/customcurrency.pipe';
import { CustomweightPipe } from './custompipes/customweight.pipe';
import { ShipmentformComponent } from './shipmentform/shipmentform.component';

@NgModule({
  declarations: [
    AppComponent,
    MainheaderComponent,
    PackageformComponent,
    PackageoverviewComponent,
    ShipmentformComponent,
    ReplacePipe,
    CustomcurrencyPipe,
    CustomweightPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [PackagedataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
