import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-tweets',
  templateUrl: './tweets.component.html'
})
export class TweetsComponent implements OnInit {
  posts: any[] = [];
  loggedUserId: number = 1;

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.postService.getAllPosts().subscribe({
      next: (data) => {
        this.posts = data;
      },
      error: (err) => {
        console.error("Error al cargar posts:", err);
      }
    });
  }
}
