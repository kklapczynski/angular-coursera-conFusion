import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
import { DISHES } from '../shared/dishes';
import { of, Observable } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor() { }
  getDishes(): Observable<Dish[]> {
    return of(DISHES).pipe(delay(2000));

    // return new Promise((resolve, reject) => {
    //   setTimeout(() => {
    //     resolve(DISHES);
    //   }, 2000);
    // });
    // return Promise.resolve(DISHES);
  }
  getDish(id: number): Observable<Dish> {
    // replacing a promise with an observable
    return of(DISHES.filter( dish => dish.id === id)[0]).pipe(delay(2000));

    // version with a promise:
    // return new Promise((resolve, reject) => {
    //   setTimeout( () => {
    //     resolve(DISHES.filter((dish) => (dish.id === id))[0]);
    //     // reject(`Problem with getting dish with id: ${id}`);
    //   }, 2000);
    // })
    // return Promise.resolve(DISHES.filter((dish) => (dish.id === id))[0]);
  }
  getFeaturedDish(): Observable<Dish> {
    return of(DISHES.filter( dish => dish.featured)[0]).pipe(delay(2000));
    
    // return new Promise((resolve, reject) => {
    //   setTimeout( () => {
    //     resolve(DISHES.filter((dish) => (dish.featured))[0]);
    //   }, 2000);
    // });
  }
}
