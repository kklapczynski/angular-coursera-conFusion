import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
import { of, Observable } from 'rxjs';
import { delay, map, catchError  } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  }
  getDish(id: number): Observable<Dish> {
    // data from server
    return this.http.get<Dish>(`${baseURL}dishes/${id}`)
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }
  getFeaturedDish(): Observable<Dish> {
    // getting data from server
    return this.http.get<Dish>(`${baseURL}dishes?featured=true`)
      .pipe(map(dishes => { return dishes[0] }))
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }
  getDishIds(): Observable<number[] | any> {
    // version with data from server
    return this.getDishes()
      .pipe(map(dishes => dishes.map(dish => dish.id)))
      // handle error: client-side, network or server returned errors are already handled in getDishes()
      // so just need to catch error in mapping returned dishes to theirs ids
      .pipe(catchError(error => error));
  }
  putDish(dish: Dish): Observable<Dish> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }

    return this.http.put<Dish>(`${baseURL}dishes/${dish.id}`, dish, httpOptions)
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }
}
