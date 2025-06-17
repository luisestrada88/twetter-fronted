import { environment } from '../../environments/environment';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Credential } from '../models/user/Credential';
import { User } from '../models/user/User';

const API_BASE = `${environment.apiUrl}/auth`;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {}
private apiUrl = environment.apiUrl;

login(cred: Credential): Observable<any> {
  return this.http.post(`${this.apiUrl}/auth/login`, cred);
}

  register(myUser: User): Observable<any> {
    return this.http.post(`${API_BASE}/register`, myUser);
  }
}
