import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
import { DISHES } from '../shared/dishes';
import { of, Observable } from 'rxjs';
import { delay, map  } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';

@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor(private http: HttpClient) { }

  getDishes(): Observable<Dish[]> {
    // getting data from the server
    return this.http.get<Dish[]>(`${baseURL}dishes `);


    // version with data getting from file
    // return of(DISHES).pipe(delay(2000));

    // return new Promise((resolve, reject) => {
    //   setTimeout(() => {
    //     resolve(DISHES);
    //   }, 2000);
    // });
    // return Promise.resolve(DISHES);
  }
  getDish(id: number): Observable<Dish> {
    // data from server
    return this.http.get<Dish>(`${baseURL}dishes/${id}`);


    // version with data getting from file
    // replacing a promise with an observable
    // return of(DISHES.filter( dish => dish.id === id)[0]).pipe(delay(2000));

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
    // getting data from server
    return this.http.get<Dish>(`${baseURL}dishes?featured=true`)
      .pipe(map(dishes => { return dishes[0] }));

    // version with data getting from file
    // return of(DISHES.filter( dish => dish.featured)[0]).pipe(delay(2000));

    // return new Promise((resolve, reject) => {
    //   setTimeout( () => {
    //     resolve(DISHES.filter((dish) => (dish.featured))[0]);
    //   }, 2000);
    // });
  }
  getDishIds(): Observable<number[]> {
    // version with data from server
    return this.getDishes()
      .pipe(map(dishes => dishes.map(dish => dish.id)));

    // version with data getting from file
    // return of(DISHES.map( dish => dish.id));
  }
}
