import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-full-blog',
  templateUrl: './full-blog.component.html',
  styleUrls: ['./full-blog.component.css']
})
export class FullBlogComponent implements OnInit {
  id:any;
  fullBlog: Object = [];
  image: boolean = false;
  authorName: string;
  constructor(
    private route: ActivatedRoute,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.id = params['id'];
      if(this.id)
        this.getBlogById(this.id)
    })
    }
  
    getBlogById(id: any){
      this.authService.getBlogId(id).subscribe(
        (res)=>{
          if(res[0]){
            this.fullBlog = res[0];
            this.authorName = this.fullBlog["author"]["name"]
            if(this.fullBlog["image"])
              this.image= true
          }
        }
      )
    }

    profileImge() {
      return this.authService.endpointimage+ this.fullBlog["image"]
     }
}
