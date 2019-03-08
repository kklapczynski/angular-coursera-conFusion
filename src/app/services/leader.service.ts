import { Injectable } from '@angular/core';
import { Leader } from '../shared/leader';
import { of, Observable } from 'rxjs';
import { delay, catchError, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { baseURL } from '../shared/baseURL';
import { ProcessHTTPMsgService } from '../services/process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor(private http: HttpClient, private processHTTPMsgService: ProcessHTTPMsgService) { }

  getLeaders(): Observable<Leader[]> {
    return this.http.get<Leader[]>(`${baseURL}leadership.json`)
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getLeader(id: number): Observable<Leader> {
    return this.http.get<Leader>(`${baseURL}leadership.json/${id}`)
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getFeaturedLeader(): Observable<Leader> {
    return this.http.get<Leader>(`${baseURL}leadership.json?featured=true`)
      .pipe(map( leaders => leaders[0]))
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

}
