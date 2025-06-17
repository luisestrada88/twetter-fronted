import { Component } from '@angular/core';
import { PostService } from '../services/post.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent {
  post = {
    title: '',
    description: '',
    imageUrl: ''
  };

  selectedFile: File | null = null;
  isUploading = false;

  constructor(
    private postService: PostService,
    private router: Router,
    private http: HttpClient
  ) {}

imagenPreview: string | ArrayBuffer | null = null;

onFileSelected(event: any): void {
  const file = event.target.files[0];
  if (file) {
    this.selectedFile = file;
    const reader = new FileReader();
    reader.onload = () => this.imagenPreview = reader.result;
    reader.readAsDataURL(file);
  }
}

uploadImage(): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!this.selectedFile) return resolve('');

    const formData = new FormData();
    formData.append('file', this.selectedFile);

    this.http.post<{url: string}>(`${environment.apiUrl}/uploads`, formData).subscribe({
      next: (response) => resolve(response.url),
      error: () => reject("Error al subir imagen")
    });
  });
}

  async crearPost() {
    this.isUploading = true;
    try {
      this.post.imageUrl = await this.uploadImage();

      const usuario = localStorage.getItem("username");
      if (!usuario) throw new Error("Usuario no autenticado");

      this.postService.createPost({
        ...this.post,
        username: usuario
      }).subscribe({
        next: () => {
          alert("Publicación creada");
          this.router.navigate(['/home']);
        },
        error: () => alert("Error al crear publicación")
      });
    } catch (err) {
      alert(err);
    } finally {
      this.isUploading = false;
    }
  }
}
