import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { ViewContainerRef } from '@angular/core';
import { MatDialog, MatDialogConfig, MatSortModule, MatDialogRef, MatTableDataSource, MatIconRegistry, MatSort, MatPaginator } from '@angular/material';
import { Title, DomSanitizer } from '@angular/platform-browser';
import { FormControl, Validators } from '@angular/forms';
import UserService from '../user.service';
import { IMedicine } from '../Medicine';
import { element } from 'protractor';
import { isNullOrUndefined } from 'util';
import { Overlay, OverlayRef, OverlayConfig } from '@angular/cdk/overlay';
import { INotificationOptions } from '../notificationOptions';
import { ComponentPortal } from '@angular/cdk/portal';
import { Severity } from '../enum';
import { CommonNotificationComponent } from '../common-notification-component/common-notification.component';
import { formatDate, DatePipe } from '@angular/common';
import { ViewUpdateMedCardComponent } from '../view-update-medicine-component/view-update-med.component';

@Component({
  selector: 'all-meds',
  templateUrl: './all-meds.component.html',
  styleUrls: ['./all-meds.component.scss']

})

export class AllMedsComponent implements OnInit {
  // declaring variables.
  displayedColumns: string[] = ['name', 'brand', 'expiryDate', 'price', 'quantity', 'update'];
  dataSource: MatTableDataSource<IMedicine>;
  medicines: IMedicine[];
  dialogRefAddUser: MatDialogRef<ViewUpdateMedCardComponent>;
  //dialogRefAddUser: MatDialogRef<AddEditUserCardComponent>;
  private _overlayRef: OverlayRef;
  visible: boolean = false;
  displayMessage: string;

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private userService: UserService,
    private datePipe: DatePipe,
    public dialog: MatDialog,
    iconRegistry: MatIconRegistry,
    public viewContainer: ViewContainerRef,
    sanitizer: DomSanitizer
  ) {
    iconRegistry.addSvgIcon('close', sanitizer.bypassSecurityTrustResourceUrl('assets/ico_close.svg'));
    iconRegistry.addSvgIcon('add', sanitizer.bypassSecurityTrustResourceUrl('assets/ico_add.svg'));
    iconRegistry.addSvgIcon('status', sanitizer.bypassSecurityTrustResourceUrl('assets/ico_inactive.svg'));
  }

  async ngOnInit() {
    this.medicines = await this.userService.getAllMeds();
    var currentDate = new Date();
    for (var i = 0; i < this.medicines.length; i++) {
      this.medicines[i].expiryDate = this.datePipe.transform(this.medicines[i].expiryDate, 'dd-MM-yyyy');
      var dateArray = this.medicines[i].expiryDate.split("-");
      if (+dateArray[2] == currentDate.getFullYear() &&
        +dateArray[1] == (currentDate.getMonth() + 1) &&
        (+dateArray[0] - currentDate.getDate() < 30)) {
        this.medicines[i].expiryStatus = true;
      }
    }
    this.dataSource = new MatTableDataSource(this.medicines);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  async updateNotes(id) {
    var objToUpdate = this.medicines.find(item => item.id == id);
    let config: MatDialogConfig = {
      height: '70vh',
      width: '70vw',
    };
    this.dialogRefAddUser = this.dialog.open(ViewUpdateMedCardComponent, config);
    this.dialogRefAddUser.disableClose = false;
    this.dialogRefAddUser.componentInstance.row = objToUpdate;
    
    let response = await this.dialogRefAddUser.afterClosed().toPromise();
    if (response != null) {
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.filteredData.length == 0) {
      this.displayMessage = "No Records Found"
    }
    else {
      this.displayMessage = "";
    }
  }
}



