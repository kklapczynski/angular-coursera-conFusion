import { Injectable } from '@angular/core';
import { Promotion } from '../shared/promotion';
import { PROMOTIONS } from '../shared/promotions';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor() { }

  getPromotions(): Promise<Promotion[]> {
    return Promise.resolve(PROMOTIONS);
  }
  getPromotion(id: number): Promotion {
      return PROMOTIONS.filter((promo) => (promo.id === id))[0];
  }
  getFeaturedPromotion(): Promise<Promotion> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(PROMOTIONS.filter((promo) => (promo.featured))[0]);
      }, 2000);
    });
    // return Promise.resolve(PROMOTIONS.filter((promo) => (promo.featured))[0]);
  }
}
