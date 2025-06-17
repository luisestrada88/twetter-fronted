import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PostService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getAllPosts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/posts/`);
  }

  createPost(postData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/posts/`, postData);
  }
}
