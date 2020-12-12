import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { AddBlogComponent } from './component/add-blog/add-blog.component'
import { AuthGuard } from './service/auth.guard';
import { FullBlogComponent } from './component/full-blog/full-blog.component';
const routes: Routes = [

   { path: '', redirectTo: '/signin', pathMatch: 'full' },
   {path: 'signin', loadChildren: () => import('./component/signin/signin.module').then(m => m.SigninModule) },
   { path: 'signup', loadChildren: () => import('./component/signup/signup.module').then(m => m.SignupModule) },
   { path: 'home', component: HomeComponent },
   { path: 'fullPost', component: FullBlogComponent },
   { path: 'addblog', component: AddBlogComponent, canActivate: [AuthGuard] }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
