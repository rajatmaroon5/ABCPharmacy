import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { MatSliderModule } from '@angular/material/slider';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Component } from '@angular/core';
import { AppMaterialModule } from './app.material.module';
import UserService from './user.service';
import { UsersCardComponent } from './users-card-component/users-card-component';
import { MatTableModule } from '@angular/material';
import { AddEditUserCardComponent } from './addEdit-user-card-component/addEdit-user-card-component';
import { CommonNotificationComponent } from './common-notification-component/common-notification.component';

@NgModule({
  declarations: [
    AppComponent,
    UsersCardComponent,
    AddEditUserCardComponent,
    CommonNotificationComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    AppMaterialModule,
    RouterModule.forRoot([
    ]),
    BrowserAnimationsModule,
    MatSliderModule,
    MatTableModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [UserService],
  bootstrap: [AppComponent],
  entryComponents: [UsersCardComponent, AddEditUserCardComponent, CommonNotificationComponent]
})
export class AppModule { }
