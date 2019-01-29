import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProcessHTTPMsgService {

  constructor() { }

  public handleError(error: HttpErrorResponse | any) {
    let errorMsg: string;

    if(error.error instanceof ErrorEvent) {
      // client side or network error
      errorMsg = `Client or network error occured: ${error.error.message}`;
    } else {
      if (error.status === 0) {
        errorMsg = 'Server unavailable';
      } else {
        // error returned by backend - server
        errorMsg = `Server returned error: ${error.status} ${error.statusText}: ${error.error}`;
      }
    }
    // return observable with error message for user
    return throwError(errorMsg);
  }
}
