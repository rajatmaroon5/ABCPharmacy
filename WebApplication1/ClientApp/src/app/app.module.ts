import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { MatSliderModule } from '@angular/material/slider';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Component } from '@angular/core';
//import { NotFoundComponent } from './notfound/notfound.component';
import { AppMaterialModule } from './app.material.module';
import UserService from './user.service';
import { MatTableModule, MatDatepickerModule, MatButtonModule, MatFormFieldModule, MatNativeDateModule, MatPaginatorModule } from '@angular/material';
import { CommonNotificationComponent } from './common-notification-component/common-notification.component';
import { WelcomeComponent } from './welcome-component/welcome.component';
import { DatePipe } from '@angular/common';
import { AllMedsComponent } from './all-meds-component/all-meds.component';
import { AddMedComponent } from './add-med-component/add-med.component';
import { ViewUpdateMedCardComponent } from './view-update-medicine-component/view-update-med.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    AllMedsComponent,
    AddMedComponent,
    CommonNotificationComponent,
    WelcomeComponent,
    PageNotFoundComponent,
    ViewUpdateMedCardComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    MatDatepickerModule,
    MatPaginatorModule,
    MatButtonModule,
    MatFormFieldModule,
    MatNativeDateModule,
    FormsModule,
    AppMaterialModule,
    RouterModule.forRoot([
      { path: 'welcome', component: WelcomeComponent },
      { path: 'all-meds', component: AllMedsComponent },
      { path: 'add-med', component: AddMedComponent },
      { path: 'page-not-found', component: PageNotFoundComponent },
      { path: '**', redirectTo: '/page-not-found' },
      { path: '', redirectTo: '/welcome', pathMatch: 'full' },
    ]),
    BrowserAnimationsModule,
    MatSliderModule,
    MatTableModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [UserService, DatePipe],
  bootstrap: [AppComponent],
  entryComponents: [AllMedsComponent, CommonNotificationComponent, ViewUpdateMedCardComponent]
})
export class AppModule { }
