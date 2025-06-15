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

  login(myCredential: Credential): Observable<string> {
    return this.http.post(`${API_BASE}/login`, myCredential, { responseType: 'text' });
  }

  register(myUser: User): Observable<any> {
    return this.http.post(`${API_BASE}/register`, myUser);
  }
}
