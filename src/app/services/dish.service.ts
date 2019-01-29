import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
import { DISHES } from '../shared/dishes';
import { of, Observable } from 'rxjs';
import { delay, map, catchError  } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { ProcessHTTPMsgService } from './process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor(private http: HttpClient, private processHTTPMsgService: ProcessHTTPMsgService) { }

  getDishes(): Observable<Dish[]> {
    // getting data from the server
    return this.http.get<Dish[]>(`${baseURL}dishes`)
      // pipe the observable returned by HttpClient method through the error handler
      .pipe(catchError(this.processHTTPMsgService.handleError));

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
    return this.http.get<Dish>(`${baseURL}dishes/${id}`)
      .pipe(catchError(this.processHTTPMsgService.handleError));

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
      .pipe(map(dishes => { return dishes[0] }))
      .pipe(catchError(this.processHTTPMsgService.handleError));

    // version with data getting from file
    // return of(DISHES.filter( dish => dish.featured)[0]).pipe(delay(2000));

    // return new Promise((resolve, reject) => {
    //   setTimeout( () => {
    //     resolve(DISHES.filter((dish) => (dish.featured))[0]);
    //   }, 2000);
    // });
  }
  getDishIds(): Observable<number[] | any> {
    // version with data from server

    return this.getDishes()
      .pipe(map(dishes => dishes.map(dish => dish.id)))
      // handle error: client-side, network or server returned errors are already handled in getDishes()
      // so just need to catch error in mapping returned dishes to theirs ids
      .pipe(catchError(error => error));

    // version with data getting from file
    // return of(DISHES.map( dish => dish.id));
  }
}
