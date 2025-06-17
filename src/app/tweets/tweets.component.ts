import { environment } from '../../environments/environment';
import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommentService } from '../services/comment.service'; // Asegúrate de que importes el servicio

@Component({
  selector: 'app-tweets',
  templateUrl: './tweets.component.html'
})
export class TweetsComponent implements OnInit {
  @Input() post!: any;
  newComment: string = '';
  reactionCounts: { [key: string]: number } = {};
  clickedReaction: string | null = null;

  constructor(
    private http: HttpClient,
    private commentService: CommentService  // Inyectamos el servicio de comentarios
  ) {}

  ngOnInit(): void {
    this.cargarReacciones();
  }

enviarComentario() {
  if (this.newComment.trim()) {
    const userId = localStorage.getItem('userId');
    const postId = this.post.id; // Este post.id debe estar definido correctamente

    if (!userId || !postId) {
      alert('Faltan datos requeridos para el comentario.');
      return;
    }

    this.http.post(`${environment.apiUrl}/comments`, {
      content: this.newComment,
      userId: userId,
      postId: postId
    }).subscribe({
      next: (response) => {
        // Una vez el comentario sea creado en el backend, agregarlo a la lista
        if (!this.post.comments) {
          this.post.comments = [];
        }
        this.post.comments.push({
          content: this.newComment,
          user: { id: userId },
          createdAt: new Date()
        });

        this.newComment = ''; // Limpiar el campo de texto
      },
      error: (err) => {
        console.error('Error al crear el comentario:', err);
        alert('Hubo un error al agregar el comentario.');
      }
    });
  }
}

  cargarReacciones(): void {
    this.http.get<{ [key: string]: number }>(
      `${environment.apiUrl}/posts/${this.post.id}/reactions/count`
    ).subscribe({
      next: (data) => this.reactionCounts = data,
      error: (err) => console.error('Error al cargar conteos:', err)
    });
  }

reaccionar(postId: number, tipo: string): void {
  const username = localStorage.getItem('username');
  if (!username) {
    alert('Inicia sesión para reaccionar');
    return;
  }

  // Verificar si ya ha reaccionado al mismo tipo
  if (this.clickedReaction === tipo) {
    // Si ya está marcada, eliminar la reacción
    this.clickedReaction = null;
    this.reactionCounts[tipo]--;  // Decrementar el contador
  } else {
    // Si no está marcada, agregar la reacción
    this.clickedReaction = tipo;
    this.reactionCounts[tipo] = (this.reactionCounts[tipo] || 0) + 1;  // Incrementar el contador
  }

  // Enviar al backend
  this.http.post(`${environment.apiUrl}/posts/${postId}/reactions`, {
    username: username,
    reaction: tipo
  }).subscribe({
    next: () => {
      // Opcional: recargar desde backend si quieres exactitud
      // this.cargarReacciones();

      // Quitar animación después de un pequeño delay
      setTimeout(() => this.clickedReaction = null, 500);
    },
    error: (err: any) => console.error('Error al reaccionar:', err)
  });
}


}
