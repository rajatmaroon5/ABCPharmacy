import { Component, OnInit } from '@angular/core';
import { ViewContainerRef } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MatIconRegistry } from '@angular/material';
import { Title, DomSanitizer } from '@angular/platform-browser';
import { FormControl, Validators } from '@angular/forms';
import UserService from './user.service';
import { IUser } from './User';
import { UsersCardComponent } from './users-card-component/users-card-component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']

})

export class AppComponent {
  dialogRefCardUsers: MatDialogRef<UsersCardComponent>
  constructor(
    private userService: UserService,
    public dialog: MatDialog,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,
    public viewContainerRef: ViewContainerRef,
  ) {
    iconRegistry.addSvgIcon('logo', sanitizer.bypassSecurityTrustResourceUrl('assets/Logo.svg'));
    iconRegistry.addSvgIcon('user', sanitizer.bypassSecurityTrustResourceUrl('assets/ico_user.svg'));
  }

  // declaring variables.
  userRecords: IUser[];
  showWelcomePage: boolean = true;

  // method to fetch all users from user service.
  async getAllUsers() {
    this.showWelcomePage = false;

    let config: MatDialogConfig = {
      maxHeight: '100vh',
      minWidth: '70vw',
    };
    this.dialogRefCardUsers = this.dialog.open(UsersCardComponent, config);
    this.dialogRefCardUsers.disableClose = true;
  }
}
