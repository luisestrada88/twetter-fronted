import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const API_URL = 'https://randomaccess-backend.onrender.com/api/comments';

@Injectable({ providedIn: 'root' })
export class CommentService {
  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  getComments(postId: number): Observable<any> {
    return this.http.get(`${API_URL}/post/${postId}`);
  }

  postComment(content: string, userId: number, postId: number): Observable<any> {
    return this.http.post(API_URL, { content, userId, postId }, {
      headers: this.getAuthHeaders()
    });
  }

  editComment(id: number, content: string, userId: number, postId: number): Observable<any> {
    return this.http.put(`${API_URL}/${id}`, { content, userId, postId }, {
      headers: this.getAuthHeaders()
    });
  }

  deleteComment(id: number): Observable<any> {
    return this.http.delete(`${API_URL}/${id}`, {
      headers: this.getAuthHeaders()
    });
  }
}
