import { Component, OnInit } from '@angular/core';
import { ViewContainerRef } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MatIconRegistry } from '@angular/material';
import { Title, DomSanitizer } from '@angular/platform-browser';
import { FormControl, Validators } from '@angular/forms';
import UserService from '../user.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']

})
export class WelcomeComponent {
  constructor(
    private userService: UserService,
    public dialog: MatDialog,
    public viewContainerRef: ViewContainerRef,
  ) {
  }

  // declaring variables.
  //userRecords: IUser[];
  showWelcomePage: boolean = true;

  // method to fetch all users from user service.
  async getAllUsers() {
    this.showWelcomePage = false;
  }
}
