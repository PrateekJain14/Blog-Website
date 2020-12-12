import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import {  HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './service/authconfig.interceptor';
import { HomeComponent } from './component/home/home.component';
import { ShowPostComponent } from './component/show-post/show-post.component';
import { AddBlogComponent } from './component/add-blog/add-blog.component';
import { HeadComponent } from './component/head/head.component';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import { FullBlogComponent } from './component/full-blog/full-blog.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ShowPostComponent,
    AddBlogComponent,
    HeadComponent,
    FullBlogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule ,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
