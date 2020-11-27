import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { HttpProcessingService } from '../services/http-processing.service';
import { serverURL } from '../util/serverURL';


@Injectable({
  providedIn: 'root'
})
export class LocketService {

  constructor(private client: HttpClient, private httpProessingService: HttpProcessingService) { }

  public communicate(): Observable<Object> {
    return this.client.get<Object>(serverURL + 'communicate')
      .pipe(
        catchError(this.httpProessingService.handleError)
      );
  }

  public uploadFile(files: FormData, multiple: boolean): Observable<Object> {
    if (multiple)
      return this.client.post<FormData>(serverURL + 'uploadFiles', files)
        .pipe(
          catchError(this.httpProessingService.handleError)
        );

    return this.client.post<FormData>(serverURL + 'uploadFile', files)
      .pipe(
        catchError(this.httpProessingService.handleError)
      );
  }

  public sendTextToEncrypt(text: object): Observable<Object> {
    return this.client.post<object>(serverURL + 'text/save', text)
      .pipe(
        catchError(this.httpProessingService.handleError)
      );
  }


}
