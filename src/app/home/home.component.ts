import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post.service';
import { CommentService } from '../services/comment.service'; // <-- IMPORTANTE
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  posts: any[] = [];
  commentTexts: { [key: number]: string } = {};

  constructor(
    private postService: PostService,
    private commentService: CommentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarPosts();
  }

cargarPosts(): void {
  this.postService.getAllPosts().subscribe({
    next: (data) => {
      this.posts = data.reverse().map(p => ({ ...p, showAllComments: false }));
    },
    error: (err) => {
      console.error("Error al cargar posts:", err);
    }
  });
}

getUserId(): number {
  const token = localStorage.getItem('token');
  if (!token) return 0;
  const payload = JSON.parse(atob(token.split('.')[1]));
  return parseInt(payload.sub);
}

  sendComment(postId: number) {
    const content = this.commentTexts[postId];
    const userId = this.getUserId();

    if (!content || !userId) return;

    this.commentService.postComment(content, userId, postId).subscribe({
      next: () => {
        this.commentTexts[postId] = '';
        this.cargarPosts(); // recarga los comentarios
      },
      error: (err) => {
        console.error('Error al enviar comentario:', err);
      }
    });
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
getVisibleComments(post: any) {
  if (!post.comments) return [];
  return post.showAllComments ? post.comments : post.comments.slice(0, 2);
}


}
