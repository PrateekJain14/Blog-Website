import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Router } from '@angular/router';
import { TosterService } from './toster.service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  endpoint: string = ( location.port == '4200')? window.location.protocol+"//"+window.location.hostname+":"+8080  : window.location.protocol+"//"+window.location.hostname+":"+location.port  ;
  endpointimage: string = `${this.endpoint}/filesystem/image/`;
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  currentUser = {};
  categoryJson: any = ["Cricket", "Food", "Technical"]

  constructor(    
    private http: HttpClient,
    public router: Router,
    public toster: TosterService
    ) { }

    signUp(user: any): Observable<any> {
      let api = `${this.endpoint}/api/register-author`;
      return this.http.post(api, user).pipe(catchError(this.handleError));
    }

    signIn(user: any) {
      return this.http
        .post<any>(`${this.endpoint}/api/signin`, user)
        .subscribe((res: any) => {
          if (res.status && res.status == 401) {
            this.toster.error(res.message);
          } else {
            localStorage.setItem('access_token', res.token);
            localStorage.setItem('profile', JSON.stringify(res.prifile));
            localStorage.setItem('xetdsetf', "1");
  
            this.currentUser = res;
            this.router.navigate(['home']);

          }
        });
    }
    
    getToken() {
      return localStorage.getItem('access_token');
    }
  
    isLoggedIn(): boolean {
      let authToken = localStorage.getItem('access_token');
      return authToken !== null ? true : false;
    }

    doLogout() {
      let removeToken = localStorage.removeItem('access_token');
      if (removeToken == null) {
        this.router.navigate(['signin']);
      }
    }

    getBlogbyCategory(val: String){
      let api = `${this.endpoint}/api/getBlogCategory?category=` + val;
        return this.http.get(api, { headers: this.headers} ).pipe(
        map((res: Response) => {
        return res || {};
      }),
      catchError(this.handleError)
    );
    }

    addBlog(blog: any) {
      return this.http
        .post<any>(`${this.endpoint}/api/addBlog`, blog)
        .pipe(catchError(this.handleError));
    }

    getBlogId(val){
      let api = `${this.endpoint}/api/getBlogId?id=` + val;
        return this.http.get(api, { headers: this.headers} ).pipe(
        map((res: Response) => {
        return res || {};
      }),
      catchError(this.handleError)
    );
    }

    handleError(error: HttpErrorResponse) {
      let msg = '';
      if (error.error instanceof ErrorEvent) {
        // client-side error
        msg = error.error.message;
      } else {
        // server-side error
        msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
      }
      return throwError(msg);
    }
}
