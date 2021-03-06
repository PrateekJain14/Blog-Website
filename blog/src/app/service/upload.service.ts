import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpErrorResponse, HttpEventType } from  '@angular/common/http';
import { map } from  'rxjs/operators';
import { AuthService  } from './auth.service'



@Injectable({
  providedIn: 'root'
})
export class UploadService {


  constructor(private httpClient: HttpClient,public AuthService : AuthService) { }

  SERVER_URL: string = `${this.AuthService.endpoint}/filesystem`;
  public upload(data) {
    let uploadURL = `${this.SERVER_URL}/upload`;
    return this.httpClient.post<any>(uploadURL, data, {
      reportProgress: true,
      observe: 'events'
    }).pipe(map((event) => {

      switch (event.type) {

        case HttpEventType.UploadProgress:
          const progress = Math.round(100 * event.loaded / event.total);
          return { status: 'progress', message: progress };

        case HttpEventType.Response:
          return event.body;
        default:
          return `Unhandled event: ${event.type}`;
      }
    })
    );
  }

}
