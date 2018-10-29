import { Injectable } from '@angular/core';
import { Promotion } from '../shared/promotion';
import { PROMOTIONS } from '../shared/promotions';
import { of, Observable } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor() { }

  getPromotions(): Observable<Promotion[]> {
    return of(PROMOTIONS).pipe(delay(2000));

    // return Promise.resolve(PROMOTIONS);
  }
  getPromotion(id: number): Observable<Promotion> {
    return of(PROMOTIONS.filter( promo => promo.id === id)[0]).pipe(delay(2000));
    
    // return PROMOTIONS.filter((promo) => (promo.id === id))[0];
  }
  getFeaturedPromotion(): Observable<Promotion> {
    return of(PROMOTIONS.filter( promo => promo.featured)[0]).pipe(delay(2000));
    
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
