import { Injectable } from '@angular/core';
import { Promotion } from '../shared/promotion';
import { PROMOTIONS } from '../shared/promotions';
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
    return this.http.get<Promotion[]>(`${baseURL}promotions`);
    // return of(PROMOTIONS).pipe(delay(2000));
    // return Promise.resolve(PROMOTIONS);
  }
  getPromotion(id: number): Observable<Promotion> {
    return this.http.get<Promotion>(`${baseURL}promotions/${id}`)
      .pipe(catchError(this.processHttpMsgService.handleError))
    // return of(PROMOTIONS.filter( promo => promo.id === id)[0]).pipe(delay(2000));
    // return PROMOTIONS.filter((promo) => (promo.id === id))[0];
  }
  getFeaturedPromotion(): Observable<Promotion> {
    return this.http.get<Promotion>(`${baseURL}promotions?featured=true`)
      .pipe(
        map( promotions => promotions[0]),
        catchError(this.processHttpMsgService.handleError)
      )
    // return of(PROMOTIONS.filter( promo => promo.featured)[0]).pipe(delay(2000));
    // other way of running setTimout
    // return new Promise((resolve, reject) => {
    //   setTimeout(resolve, 2000, PROMOTIONS.filter((promo) => (promo.featured))[0]);
    // });
    // like in examples:
    // return new Promise((resolve, reject) => {
    //   setTimeout(() => {
    //     resolve(PROMOTIONS.filter((promo) => (promo.featured))[0]);
    //   }, 2000);
    // });
    // return Promise.resolve(PROMOTIONS.filter((promo) => (promo.featured))[0]);
  }
}
