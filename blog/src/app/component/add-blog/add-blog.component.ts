import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { UploadService } from  '../../service/upload.service';

@Component({
  selector: 'app-add-blog',
  templateUrl: './add-blog.component.html',
  styleUrls: ['./add-blog.component.css']
})
export class AddBlogComponent implements OnInit {

  blogForm: FormGroup;
  category: any = [];
  uploadResponse = { status: '', message: '', filePath: '' };

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private uploadService: UploadService,
    private route: Router) { }
  
  ngOnInit(): void {
    this.category = [...this.authService.categoryJson]
    this.blogForm = this.fb.group({
      title: ["", Validators.required],
      category: [this.category[0], Validators.required],
      description: ["", Validators.required],
      image: [""],
      author: [JSON.parse(localStorage.getItem('profile'))["_id"]]
    })
  }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.blogForm.get('image').setValue(file);
    }
    this.onSubmit()
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('file', this.blogForm.get('image').value);

    this.uploadService.upload(formData  ).subscribe(
      (res) => {  this.uploadResponse = res ;
        if(res && res.file){
          this.blogForm.patchValue({image:res.file.filename})
        }
      } ,
      (err) => {}
    );
  }
  profileImge() {
    return this.authService.endpointimage+ this.blogForm.value.image
   }

  saveForm(){
    this.authService.addBlog(this.blogForm.value).subscribe((res)=>{
      if(res)
       this.route.navigate(['home'])
    })
  }

}
