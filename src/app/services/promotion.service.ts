import { Injectable } from '@angular/core';
import { Promotion } from '../shared/promotion';
import { of, Observable } from 'rxjs';
import { delay, map, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { baseURL } from '../shared/baseUrl';
import { ProcessHTTPMsgService } from '../services/process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor(private http: HttpClient, private processHttpMsgService: ProcessHTTPMsgService) { }

  getPromotions(): Observable<Promotion[]> {
    return this.http.get<Promotion[]>(`${baseURL}promotions.json`)
      .pipe(catchError(this.processHttpMsgService.handleError))
  }
  getPromotion(id: number): Observable<Promotion> {
    return this.http.get<Promotion>(`${baseURL}promotions.json/${id}`)
      .pipe(catchError(this.processHttpMsgService.handleError))
  }
  getFeaturedPromotion(): Observable<Promotion> {
    return this.http.get<Promotion>(`${baseURL}promotions.json?featured=true`)
      .pipe(
        map( promotions => promotions[0]),
        catchError(this.processHttpMsgService.handleError)
      )
  }
}
