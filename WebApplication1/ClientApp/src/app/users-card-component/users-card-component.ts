import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { ViewContainerRef } from '@angular/core';
import { MatDialog, MatDialogConfig, MatSortModule, MatDialogRef, MatTableDataSource, MatIconRegistry, MatSort } from '@angular/material';
import { Title, DomSanitizer } from '@angular/platform-browser';
import { FormControl, Validators } from '@angular/forms';
import UserService from '../user.service';
import { IUser } from '../User';
import { element } from 'protractor';
import { AddEditUserCardComponent } from '../addEdit-user-card-component/addEdit-user-card-component';
import { isNullOrUndefined } from 'util';
import { Overlay, OverlayRef, OverlayConfig } from '@angular/cdk/overlay';
import { INotificationOptions } from '../notificationOptions';
import { ComponentPortal } from '@angular/cdk/portal';
import { Severity } from '../enum';
import { CommonNotificationComponent } from '../common-notification-component/common-notification.component';

@Component({
  selector: 'users-all-details',
  templateUrl: './users-card-component.html',
  styleUrls: ['./users-card-component.scss']

})

export class UsersCardComponent implements OnInit {
  // declaring variables.
  displayedColumns: string[] = ['name', 'email', 'roleType', 'status', 'action'];
  dataSource: MatTableDataSource<IUser>;
  userDetails: IUser[];
  dialogRefAddUser: MatDialogRef<AddEditUserCardComponent>;
  private _overlayRef: OverlayRef;
  visible: boolean = false;

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private userService: UserService,
    public dialog: MatDialog,
    private _overlay: Overlay,
    iconRegistry: MatIconRegistry,
    public viewContainer: ViewContainerRef,
    sanitizer: DomSanitizer
  ) {
    iconRegistry.addSvgIcon('edit', sanitizer.bypassSecurityTrustResourceUrl('assets/ico_edit.svg'));
    iconRegistry.addSvgIcon('users', sanitizer.bypassSecurityTrustResourceUrl('assets/ico_users.svg'));
    iconRegistry.addSvgIcon('add', sanitizer.bypassSecurityTrustResourceUrl('assets/ico_add.svg'));
    iconRegistry.addSvgIcon('status', sanitizer.bypassSecurityTrustResourceUrl('assets/ico_inactive.svg'));
  }

  async ngOnInit() {
    this.userDetails = await this.userService.getAllUsers();
    for (var i = 0; i < this.userDetails.length; i++) {
      if (this.userDetails[i].roleType == "A") {
        this.userDetails[i].roleType = "Admin";
      }
      else {
        this.userDetails[i].roleType = "Customer Executive";
      }
    }
    this.dataSource = new MatTableDataSource(this.userDetails);
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  async onAddEditClicked(element) {
    var fromAdd;
    if (isNullOrUndefined(element)) {
      fromAdd = true;
    }
    else {
      fromAdd = false;
    }

    let config: MatDialogConfig = {
      height: '57vh',
      width: '25vw',
    };
    this.dialogRefAddUser = this.dialog.open(AddEditUserCardComponent, config);
    this.dialogRefAddUser.disableClose = true;
    this.dialogRefAddUser.componentInstance.fromAdd = fromAdd;
    if (!fromAdd) {
      this.dialogRefAddUser.componentInstance.row = element;
    }

    let response = await this.dialogRefAddUser.afterClosed().toPromise();
    if (response != null) {
      response.roleType == "A" ? response.roleType = "Admin" : response.roleType = "Customer Executive";
      if (fromAdd) {
        this.userDetails.unshift(response);
        this.dataSource.data = this.userDetails;
        this.showSuccessMessage("User Added Succesfully.");
      }
      else {
        var index = this.userDetails.findIndex(x => x.id == response.id);
        this.userDetails.splice(index, 1, response);
        this.dataSource.data = this.userDetails;
        this.showSuccessMessage("User Updated Successfully.")
      }
    }
  }

  showSuccessMessage(str: string) {
    if (str) {
      console.info(str);
      this.showNotification(str, this.viewContainer,
        { severity: Severity.success, closeTimeOut: 4000, outsideClickClose: true });
    }
  }

  //this method will show overlay for notification
  showNotification(notificationMessage: string,
    viewContainer?: ViewContainerRef, notificationOptions?: INotificationOptions):
    void {
    try {
      this._createOverlay();
      if (!this.visible && this._overlayRef && !this._overlayRef.hasAttached()) {
        this.visible = true;
        let portal = new ComponentPortal(CommonNotificationComponent, viewContainer, null);
        let instance: CommonNotificationComponent =
          this._overlayRef.attach(portal).instance as CommonNotificationComponent;

        instance.notificationMessage = notificationMessage;
        if (notificationOptions && notificationOptions.severity == Severity.error) {
          instance.notificationError = true;
        } else if (notificationOptions && notificationOptions.severity == Severity.information) {
          instance.notificationInfo = true;
        } else if (notificationOptions && notificationOptions.severity == Severity.warning) {
          instance.notificationWarning = true;
        } else {
          instance.notificationSuccess = true;
        }
        instance.showConsoleErrorMessage = false;
        let subscription = instance.afterClosed().subscribe(() => {
          this.hideNotificationDialog();
          subscription.unsubscribe();
        });
        instance.isOutsideClickEnable = false;
        this._updatePosition(null);
      }
      const TIME_OUT = 50000;
      setTimeout(() => {
        this.hideNotificationDialog();
      }, notificationOptions && notificationOptions.closeTimeOut ? notificationOptions.closeTimeOut : TIME_OUT);
    } catch (err) {
      console.error(err);
    } finally {
    }
  }

  //this method is used to create overlay page.
  private _createOverlay() {
    try {
      if (this._overlayRef) {
        if (this.visible) {
          // if visible, hide before destroying
          this.hideNotificationDialog();
          this._createOverlay();
        } else {
          // if not visible, dispose and recreate
          this._overlayRef.dispose();
          this._overlayRef = null;
          this._createOverlay();
        }
      } else {

        // for side bar notification message poisition.
        let strategy = this._overlay.position().global().right("2.5%").top("4.6%");
        let config = new OverlayConfig();
        //config.positionStrategy
        config.positionStrategy = strategy;
        this._overlayRef = this._overlay.create(config);
      }
    } catch (err) {
      console.error(err);
    }
  }

  //this method will hide  overlay
  hideNotificationDialog(): void {
    try {
      if (this.visible && this._overlayRef && this._overlayRef.hasAttached()) {
        this.visible = false;
        this._overlayRef.detach();
      }
    } catch (err) {
      console.error(err);
    }
  }

  //this method uppdates the position of the overlay based on the position strategy.
  private _updatePosition(_changeDetectionRef: ChangeDetectorRef) {
    try {
      if (this._overlayRef) {
        this._overlayRef.updatePosition();
      }
    } catch (err) {
      console.error(err);
    }
  }
}



