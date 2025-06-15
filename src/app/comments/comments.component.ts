import { Component, Input, OnInit } from '@angular/core';
import { CommentService } from '../services/comment.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
  @Input() postId!: number;
  @Input() userId!: number;

  comments: any[] = [];
  newComment: string = '';

  constructor(private commentService: CommentService) {}

  ngOnInit(): void {
    this.loadComments();
  }

  loadComments() {
    this.commentService.getComments(this.postId).subscribe({
      next: (data) => this.comments = data,
      error: (err) => console.error("Error al cargar comentarios:", err)
    });
  }

  submitComment() {
    if (this.newComment.trim()) {
      this.commentService.postComment(this.newComment, this.userId, this.postId).subscribe({
        next: () => {
          this.newComment = '';
          this.loadComments();
        },
        error: (err) => console.error("Error al enviar comentario:", err)
      });
    }
  }
}
