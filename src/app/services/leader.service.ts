import { Injectable } from '@angular/core';
import { Leader } from '../shared/leader';
import { LEADERS } from '../shared/leaders';
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
    return this.http.get<Leader[]>(`${baseURL}leadership`)
      .pipe(catchError(this.processHTTPMsgService.handleError));

    // return of(LEADERS).pipe(delay(2000));

    // return new Promise((resolve, reject) => {
    //   setTimeout(() => {
    //     resolve(LEADERS);
    //   }, 2000);
    // });
    // return Promise.resolve(LEADERS);
  }

  getLeader(id: number): Observable<Leader> {
    return this.http.get<Leader>(`${baseURL}leadership/${id}`)
      .pipe(catchError(this.processHTTPMsgService.handleError));
    // return of(LEADERS.filter( leader => leader.id === id)[0]).pipe(delay(2000));
    // return LEADERS.filter((leader) => (leader.id === id))[0];
  }

  getFeaturedLeader(): Observable<Leader> {
    return this.http.get<Leader>(`${baseURL}leadership?featured=true`)
      .pipe(map( leaders => leaders[0]))
      .pipe(catchError(this.processHTTPMsgService.handleError));
    // return of(LEADERS.filter( leader => leader.featured)[0]).pipe(delay(2000));
    // return new Promise((resolve, reject) => {
    //   setTimeout(() => {
    //     resolve(LEADERS.filter((leader) => (leader.featured))[0]);
    //   }, 2000);
    // });
    // return Promise.resolve(LEADERS.filter((leader) => (leader.featured))[0]);
  }

}
