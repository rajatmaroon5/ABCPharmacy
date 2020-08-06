import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUser } from './User';

@Injectable()
export default class UserService {
  public API = 'http://localhost:8080/api';
  public JOGGING_RECORDS_ENDPOINT = `${this.API}/joggingrecords`;

  constructor(private http: HttpClient) { }

  async getAllUsers(): Promise<IUser[]> {
     return await this.http.get<IUser[]>('https://localhost:44382/api/users').toPromise();
    
  }

  async addUser(userToAdd: IUser): Promise<IUser> {
    return await this.http.post<IUser>('https://localhost:44382/api/users', userToAdd).toPromise();
  }

  async editUser(user: IUser, id): Promise<IUser> {
    return await this.http.put<IUser>(`https://localhost:44382/api/users/${id}`, user).toPromise();
  }
}

