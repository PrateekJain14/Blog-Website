import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;

  constructor(
    public fb: FormBuilder,
    public authService: AuthService,
    public router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.signupForm = this.fb.group({
      name: ['', [Validators.required,
      Validators.minLength(3)]],
      email: ['',Validators.required],
      password: ['', [Validators.required,
      Validators.minLength(6)]],
    })
  }

  registerUser() {
    this.authService.signUp(this.signupForm.value).subscribe((res) => {
      let obj = {
        email: this.signupForm.value.email,
        password:this.signupForm.value.password
      }
      this.authService.signIn(obj)
    })
  }

}
