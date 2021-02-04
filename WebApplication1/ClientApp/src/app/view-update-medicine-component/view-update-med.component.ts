import { Component, OnInit, ViewChild } from '@angular/core';
import { ViewContainerRef } from '@angular/core';
import { MatDialog, MatDialogConfig, MatSortModule, MatDialogRef, MatTableDataSource, MatIconRegistry, MatSort } from '@angular/material';
import { Title, DomSanitizer } from '@angular/platform-browser';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import UserService from '../user.service';
import { element } from 'protractor';
import { isNullOrUndefined } from 'util';
import { IMedicine } from '../Medicine';
import { Router } from '@angular/router';

@Component({
  selector: 'view-update-med-card',
  templateUrl: './view-update-med.component.html',
  styleUrls: ['./view-update-med.component.scss']

})

export class ViewUpdateMedCardComponent implements OnInit {

  // declaring variables.
  dialogRefAddUser: MatDialogRef<ViewUpdateMedCardComponent>
  fromAdd: boolean;
  title: string;
  formForUser: FormGroup;
  errorMessage: string = "";
  errorMessageEmail: string = "";
  errorMessageMobileNumber: string = "";
  button: string = "";
  medicine: IMedicine;
  row: any;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    public dialogRefCard: MatDialogRef<ViewUpdateMedCardComponent>,
    iconRegistry: MatIconRegistry,
    private router: Router,
    sanitizer: DomSanitizer
  ) {
    iconRegistry.addSvgIcon('close', sanitizer.bypassSecurityTrustResourceUrl('assets/ico_close.svg'));
  }

  async ngOnInit() {
    this.title = "Medicine Details"
    this.formForUser = this.userService.createFormGroup();
    this.setFormValues(this.row, this.formForUser);
  }

  public setFormValues(item, form: FormGroup) {
    this.formForUser.get('name').setValue(item.name);
    this.formForUser.get('brand').setValue(item.brand);
    this.formForUser.get('price').setValue(item.price);
    this.formForUser.get('quantity').setValue(item.quantity);
    this.formForUser.get('notes').setValue(item.notes);
    this.formForUser.get('expiryDate').setValue(item.expiryDate);

    this.formForUser.get('name').disable();
    this.formForUser.get('brand').disable();
    this.formForUser.get('price').disable();
    this.formForUser.get('quantity').disable();
    this.formForUser.get('expiryDate').disable();
  }

  close() {
    this.dialogRefCard.close(null);
  }

  async saveData() {
    if (this.formForUser.dirty) {
      this.row.notes = this.formForUser.get('notes').value;
      var dateArray = this.row.expiryDate.split("-");
      this.row.expiryDate = dateArray[2] + "-" + dateArray[1] + "-" + dateArray[0];
      var response = await this.userService.update(this.row, this.row.id);
      alert("Record updated sucessfully!");
      this.dialogRefCard.close(null);
      this.router.navigateByUrl('/all-meds');
    }
  }

  onCancel() {
    this.dialogRefCard.close(null);
  }
}



