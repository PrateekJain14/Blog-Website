import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service'
@Component({
  selector: 'app-head',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.css']
})
export class HeadComponent implements OnInit {

  constructor(private authservice: AuthService, public router: Router  ) { }
  show: boolean = false;
  ngOnInit(): void {
    if(this.authservice && this.authservice.isLoggedIn()){
      this.show= true;
    }
  }

  logout(){
    this.authservice.doLogout();
  }

  login(){
    this.router.navigate(['signin']);
  }

  addBlog(){
    this.router.navigate(['addblog']);
  }

  goHome(){
    this.router.navigate(['home']);
  }
}
