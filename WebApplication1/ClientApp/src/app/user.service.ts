import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IMedicine } from './Medicine';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Injectable()
export default class UserService {
  public API = 'http://localhost:8080/api';
  public JOGGING_RECORDS_ENDPOINT = `${this.API}/joggingrecords`;

  constructor(private http: HttpClient, private formBuilder: FormBuilder,) { }

  async getAllMeds(): Promise<IMedicine[]> {
    return await this.http.get<IMedicine[]>('https://localhost:44382/api/medicines').toPromise();
    
  }

  async add(objToAdd: IMedicine): Promise<IMedicine> {
    return await this.http.post<IMedicine>('https://localhost:44382/api/medicines?overrideWarning=true', objToAdd).toPromise();
  }

  async update(objToUpdate: IMedicine, id: number): Promise<IMedicine> {
    return await this.http.put<IMedicine>('https://localhost:44382/api/medicines/' + id +'?overrideWarning=true', objToUpdate).toPromise();
  }

  createFormGroup(): FormGroup {
    return this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(128)]],
      brand: ['', [Validators.required, Validators.maxLength(128)]],
      quantity: [0, [Validators.required, Validators.min(1)]],
      price: ['', [Validators.required, Validators.pattern(/^(?:\d*\.\d{1,2}|\d+)$/)]],
      expiryDate: '',
      notes: ''
    });
  }

  initializeNewObject() {
    let obj: IMedicine = {
      id: 0,
      name: '',
      brand: '',
      quantity: 0,
      price: 0.00,
      expiryDate: '',
      notes: '',
    }
    return obj;
  }
}

