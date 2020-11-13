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
        catchError(this.httpProessingService.handleError));
  }

}
