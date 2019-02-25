//module
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule, routesComponent } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http';

import { ToastrModule } from 'ngx-toastr'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MaterialModule } from './material/material.module';

//services
import { MessageService } from './shared/message.service';
import { HttpErrorHandler } from './shared/http-error-handler.service';
import { OperationService } from './shared/operation.service';


//component
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';

import { ListComponent } from './list/list.component';
import { OverviewComponent } from './overview/overview.component';
import { YangonComponent } from './work-order-create/yangon/yangon.component';
import { MandalayComponent } from './work-order-create/mandalay/mandalay.component';
import { BiComponent } from './work-order-create/bi/bi.component';
import { OpiComponent } from './work-order-create/opi/opi.component';

import { AddressComponent } from './list/address/address.component';
import { OrderComponent } from './list/order/order.component';
import { OrderService } from './shared/order.service';


@NgModule({
  declarations: [
    AppComponent,
    YangonComponent,
    MandalayComponent,
    BiComponent,
    OpiComponent,
    OverviewComponent,
    ListComponent,
    NavbarComponent,
    AddressComponent,
    OrderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule, 
    MaterialModule,

    ToastrModule.forRoot({
      timeOut: 5000, positionClass:'toast-bottom-right', preventDuplicates:true, resetTimeoutOnDuplicate:true
    })       
  ],
  providers: [OrderService, OperationService, MessageService, HttpErrorHandler],
  bootstrap: [AppComponent],
  entryComponents: [OrderComponent, AddressComponent]
})
export class AppModule { }
