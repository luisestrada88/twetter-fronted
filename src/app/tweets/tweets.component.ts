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
userReaction: string | null = null;  // cuál tiene el usuario activo

ngOnInit(): void {
  this.cargarReacciones();
  this.cargarReaccionDelUsuario();
}



  constructor(
    private http: HttpClient,
    private commentService: CommentService  // Inyectamos el servicio de comentarios
  ) {}


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

cargarReaccionDelUsuario(): void {
  const username = localStorage.getItem('username');
  if (!username) return;

  this.http.get<{ reaction: string | null }>(
    `${environment.apiUrl}/posts/${this.post.id}/reactions/user?username=${username}`
  ).subscribe({
    next: (data) => this.userReaction = data.reaction,
    error: (err) => console.error('Error al obtener reacción del usuario:', err)
  });
}

reaccionar(postId: number, tipo: string): void {
  const username = localStorage.getItem('username');
  if (!username) {
    alert('Inicia sesión para reaccionar');
    return;
  }

  const yaTiene = this.userReaction === tipo;

  if (yaTiene) {
    this.reactionCounts[tipo]--;
    this.userReaction = null;
  } else {
    if (this.userReaction) {
      this.reactionCounts[this.userReaction]--;
    }
    this.reactionCounts[tipo] = (this.reactionCounts[tipo] || 0) + 1;
    this.userReaction = tipo;
  }

console.log("REACCION POST", {
  username,
  reaction: tipo,
  postId
});


  // Enviar al backend
  this.http.post(`${environment.apiUrl}/reactions/`, {
    username: username,
    reaction: tipo,
    postId: postId
  }).subscribe({
    next: () => {},
    error: (err: any) => console.error('Error al reaccionar:', err)
  });
}

}
