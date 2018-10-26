import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
import { DISHES } from '../shared/dishes';
@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor() { }
  getDishes(): Promise<Dish[]> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(DISHES);
      }, 2000);
    });
    // return Promise.resolve(DISHES);
  }
  getDish(id: number): Promise<Dish> {
      return new Promise((resolve, reject) => {
        setTimeout( () => {
          resolve(DISHES.filter((dish) => (dish.id === id))[0]);
          // reject(`Problem with getting dish with id: ${id}`);
        }, 2000);
      })
      // return Promise.resolve(DISHES.filter((dish) => (dish.id === id))[0]);
  }
  getFeaturedDish(): Promise<Dish> {
    return new Promise((resolve, reject) => {
      setTimeout( () => {
        resolve(DISHES.filter((dish) => (dish.featured))[0]);
      }, 2000);
    });
  }
}
