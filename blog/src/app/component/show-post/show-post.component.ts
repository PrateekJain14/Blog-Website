import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-show-post',
  templateUrl: './show-post.component.html',
  styleUrls: ['./show-post.component.css']
})
export class ShowPostComponent implements OnInit {
  posts: any = [];
  category: any = [];
  constructor(
    public authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.category = [...this.authService.categoryJson];
    this.getBlogByCategory(this.category[0])
  }

  getBlogByCategory(item: String) {
    this.authService.getBlogbyCategory(item).subscribe((res) => {
      if (res)
        this.posts = res;

    })

  }

}
