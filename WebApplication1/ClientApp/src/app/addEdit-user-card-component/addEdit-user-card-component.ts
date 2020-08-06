import { Component, OnInit, ViewChild } from '@angular/core';
import { ViewContainerRef } from '@angular/core';
import { MatDialog, MatDialogConfig, MatSortModule, MatDialogRef, MatTableDataSource, MatIconRegistry, MatSort } from '@angular/material';
import { Title, DomSanitizer } from '@angular/platform-browser';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import UserService from '../user.service';
import { IUser } from '../User';
import { element } from 'protractor';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'add-user-card',
  templateUrl: './addEdit-user-card-component.html',
  styleUrls: ['./addEdit-user-card-component.scss']

})

export class AddEditUserCardComponent implements OnInit {

  // declaring variables.
  dialogRefAddUser: MatDialogRef<AddEditUserCardComponent>
  fromAdd: boolean;
  title: string;
  formForUser: FormGroup;
  user: IUser;
  row: IUser;
  errorMessage: string = "";
  errorMessageEmail: string = "";
  errorMessageMobileNumber: string = "";
  button: string = "";

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    public dialogRefCard: MatDialogRef<AddEditUserCardComponent>,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer
  ) {
    iconRegistry.addSvgIcon('close', sanitizer.bypassSecurityTrustResourceUrl('assets/ico_close.svg'));
  }

  async ngOnInit() {
    if (this.fromAdd) {
      this.title = "Add user";
      this.button = "ADD USER";
    }
    else {
      this.title = "Edit user";
      this.button = "SAVE USER";
    }

    this.formForUser = this.createFormGroup();
    await this.UserIntialization();

  }

  async UserIntialization() {

    this.user = this.initializeNewObject();

    if (!this.fromAdd) {
      this.setFormValues(this.row, this.formForUser);
    }

  }

  public setFormValues(item, form: FormGroup) {
    if (item) {
      Object.keys(item).forEach(key => {
        if (key == "roleType") {
          let control = form.get(key);
          if (control) {
            if (item[key] == "Admin")
              control.setValue(0);
            else {
              control.setValue(1);
            }
          }
        }
        if (key != "id" && key !="roleType") {
          let control = form.get(key);
          if (control) {
            control.setValue(item[key]);
          }
        }
      })
    }
  }

  createFormGroup(): FormGroup {
    return this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      roleType: 0,
      mobileNumber: ['', [Validators.pattern(/^[0][1-9]\d{9}$|^[1-9]\d{9}$/)]],
    });
  }

  initializeNewObject() {
    let obj: IUser = {
      id: 0,
      name: '',
      email: '',
      roleType:'',
      mobileNumber:'',
    }
    return obj;
  }

  checkEmpty(event, control) {

    if (control == 'email' && this.formForUser.controls.email.status == "INVALID") {
      this.errorMessageEmail = "Please enter a valid email address"
    }
    else {
      this.errorMessageEmail = "";
    }

    if (control == 'name') {
      if (event.srcElement.value == "") {
        this.errorMessage = "The " + event.srcElement.placeholder + " field is required";
      }
      else {
        this.errorMessage = "";
      }
    }

    if (control == "mobileNumber") {
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

  close() {
    this.dialogRefCard.close(null);
  }

  async saveData() {
    if (this.formForUser.dirty) {
      this.user.name = this.formForUser.get('name').value;
      this.user.email = this.formForUser.get('email').value;
      if (this.formForUser.get('roleType').value == 0) {
        this.user.roleType = "A";
      }
      else {
        this.user.roleType = "E"
      }
      this.user.mobileNumber = this.formForUser.get('mobileNumber').value;

      if (!isNullOrUndefined(this.row)) {
        this.user.id = this.row.id;
        var response = await this.userService.editUser(this.user, this.row.id);
        this.dialogRefCard.close(response);
      }
      else {
        var response = await this.userService.addUser(this.user);
        this.dialogRefCard.close(response);
      }
    }
    else {
      this.dialogRefCard.close(null);
    }

  }

}



