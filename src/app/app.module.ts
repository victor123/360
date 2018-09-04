import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//Unmask Directive
import {NumericDirective} from './filter-pipe/unmask.directive';

//Routing module
import { AppRoutingModule, RoutingComponent } from './app.routerModule';
// Service
import { HttpModule } from '@angular/http';
import { ServiceData } from './services/service';
import { UserGroupService } from './services/usergroup.service';
import { AuthService } from './loginpage/login.service';

//Pagination
import { NgxPaginationModule } from 'ngx-pagination';

//Sort pipe
import { OrderModule } from './order-pipe/ngx-order.module';
import { BooleanConverterPipe } from './filter-pipe/boolean.convert';

//Filter Pipe
import { FiterPipeModule } from './filter-pipe/filter-module';
import { ProductFilterPipe } from './filter-pipe/category.filter';


import {
  ToastrModule,
  ToastNoAnimation,
  ToastNoAnimationModule
} from 'ngx-toastr';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { HeaderComponent } from './header/header.component';
import { TextMaskModule } from 'angular2-text-mask';
import { UserComponent } from './user/user.component';
import { AddgroupComponent } from './components/user/addgroup/addgroup.component';
import { ViewuserComponent } from './components/user/viewuser/viewuser.component';
import { EdituserComponent } from './components/user/edituser/edituser.component';
//import { AdduserComponent } from './components/user/adduser/adduser.component';

import { LoginpageComponent} from './loginpage/loginpage.component';

import { UsergroupComponent } from './usergroup/usergroup.component';
import { MygroupComponent } from './mygroup/mygroup.component';
import { CreateuserComponent } from './components/user/createuser/createuser.component';
import { EditusergroupComponent } from './editusergroup/editusergroup.component';
import { ReminderCalendarComponent } from './reminder-calendar/reminder-calendar.component';
import { CalendarComponent } from './calendar/calendar.component';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HeaderComponent,
    RoutingComponent,
    AddgroupComponent,
    ViewuserComponent,
    UsergroupComponent,
    MygroupComponent,
    UserComponent,
    ProductFilterPipe,
    BooleanConverterPipe,
    CreateuserComponent,
    EdituserComponent,
    EditusergroupComponent,
    NumericDirective,
    //AdduserComponent,
    LoginpageComponent,
    ReminderCalendarComponent,
    CalendarComponent

  ],
  imports: [
    BrowserModule,
    HttpModule,
    AppRoutingModule,
    FiterPipeModule,
    FormsModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    OrderModule,
    CommonModule,
    TextMaskModule,
      
    ToastNoAnimationModule,
      ToastrModule.forRoot({
      toastComponent: ToastNoAnimation,
    }),
  ],
  providers: [ServiceData, UserGroupService,AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
