import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpProcessingService {

  constructor() { }

  public handleError(error: HttpErrorResponse | any): Observable<any> {
    let errorMessage: string;

    if (error.error instanceof ErrorEvent)
      errorMessage = error.error.message;
    else
      errorMessage = `${error.status} - ${error.statusText} || '' ${error.error}`;

    return throwError(errorMessage)
  }

}
