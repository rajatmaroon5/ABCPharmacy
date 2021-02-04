import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { ViewContainerRef } from '@angular/core';
import { MatDialog, MatDialogConfig, MatSortModule, MatDialogRef, MatTableDataSource, MatIconRegistry, MatSort, MAT_DIALOG_DATA } from '@angular/material';
import { Title, DomSanitizer } from '@angular/platform-browser';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import UserService from '../user.service';
import { element } from 'protractor';
import { isNullOrUndefined } from 'util';
import { IMedicine } from '../Medicine';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']

})

export class PageNotFoundComponent {

constructor(
    private userService: UserService,
    private router: Router,
    public dialog: MatDialog,
    private datePipe: DatePipe,
    private formBuilder: FormBuilder,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer
  ) {
    iconRegistry.addSvgIcon('close', sanitizer.bypassSecurityTrustResourceUrl('assets/ico_close.svg'));
  }
}




