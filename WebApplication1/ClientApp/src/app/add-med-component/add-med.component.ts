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
  selector: 'add-med-card',
  templateUrl: './add-med.component.html',
  styleUrls: ['./add-med.component.scss']

})

export class AddMedComponent implements OnInit {

  // declaring variables.
  //dialogRefAddUser: MatDialogRef<AddEditUserCardComponent>
  fromAdd: boolean;
  title: string;
  formForUser: FormGroup;
  med: IMedicine;
  row: IMedicine;
  errorMessage: string = "";
  errorMessagePrice: string = "";
  errorMessageQty: string = "";
  errorMessagebrand: string = "";
  errorMessageMobileNumber: string = "";
  errorMessageDate: string = "";
  button: string = "";
  overrideWarning: boolean = false;

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

  async ngOnInit() {
    this.formForUser = this.userService.createFormGroup();
    await this.UserIntialization();
  }

  async UserIntialization() {
    this.med = this.userService.initializeNewObject();
  }

  checkEmpty(event, control) {

    if (control == 'name') {
      if (event.srcElement.value == "") {
        this.errorMessage = "The " + event.srcElement.placeholder + " field is required";
      }
      else {
        this.errorMessage = "";
      }
    }

    else if (control == 'brand') {
      if (event.srcElement.value == "") {
        this.errorMessagebrand = "The " + event.srcElement.placeholder + " field is required";
      }
      else {
        this.errorMessagebrand = "";
      }
    }

    else if (control == 'price') {
      if (!this.formForUser.get('price').valid) {
        this.errorMessagePrice = "Please enter numbers upto two decimal places.";
      }
      else {
        this.errorMessagePrice = "";
      }
    }

    else if (control == 'expiryDate') {
      if (event.value == "") {
        this.errorMessageDate = "The " + event.srcElement.placeholder + " field is required";
      }
      else {
        var currentDate = new Date();
        if (event.value.getFullYear() < currentDate.getFullYear() ||
          (event.value.getFullYear() == currentDate.getFullYear() && event.value.getMonth() < (currentDate.getMonth())) ||
          (event.value.getFullYear() == currentDate.getFullYear() && event.value.getMonth() == currentDate.getMonth() && (event.value.getDate() - currentDate.getDate()) < 15)) {
          this.errorMessageDate = "Expiry date should be greater than atleast 15 days from current date";
        }
        else {
          this.errorMessageDate = "";
        }
      }
    }

    else if (control == 'quantity') {
      if (event.srcElement.value == 0) {
        this.errorMessageQty = "The " + event.srcElement.placeholder + " should be more than zero";
      }
      else {
        this.errorMessageQty = "";
      }
    }

    else if (control == "mobileNumber") {
      if (this.formForUser.get(control).value == "") {
        this.formForUser.get(control).clearValidators;
        this.formForUser.updateValueAndValidity;
        this.errorMessageMobileNumber = "";
      }
      else if (this.formForUser.get(control).status == "INVALID") {
        this.errorMessageMobileNumber = "Please enter a valid mobile number";
      }
      else if (this.formForUser.get(control).status == "VALID") {
        this.errorMessageMobileNumber = "";
      }
    }
  }

  async saveData() {
    if (this.formForUser.dirty) {
      this.overrideWarning = true;
      var currentDate = new Date();
      if (this.formForUser.get('expiryDate').value.getFullYear() == currentDate.getFullYear() &&
        this.formForUser.get('expiryDate').value.getMonth() == currentDate.getMonth() &&
        (this.formForUser.get('expiryDate').value.getDate() - currentDate.getDate() < 30)) {
        if (confirm("The medicine will expire under 30 days. Do you want to continue?")) {
          this.overrideWarning = true;
        }
        else {
          this.overrideWarning = false;
        }
      }

      if (this.overrideWarning) {
        var MedicineToAdd = this.userService.initializeNewObject();
        MedicineToAdd.id = 0;
        MedicineToAdd.name = this.formForUser.get('name').value;
        MedicineToAdd.brand = this.formForUser.get('brand').value;
        MedicineToAdd.quantity = this.formForUser.get('quantity').value;
        MedicineToAdd.expiryDate = this.datePipe.transform(this.formForUser.get('expiryDate').value, 'yyyy-MM-dd');
        MedicineToAdd.price = +this.formForUser.get('price').value;
        MedicineToAdd.notes = this.formForUser.get('notes').value;
        var response = await this.userService.add(MedicineToAdd);
        alert("Record added sucessfully!");
        this.router.navigateByUrl('/all-meds');
      }
    }
  }
}




