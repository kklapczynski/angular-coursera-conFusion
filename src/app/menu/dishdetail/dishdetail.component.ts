import { Component, OnInit } from '@angular/core';
import { DishService } from '../../services/dish.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { Dish } from '../../shared/dish';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
// TODO: this component needs to be able to receive and use data of selected "dish":
    // 1.Add event binding and handler in menu component: click on mat-grid-tile = dish
    // 2.Pass selected dish to dishdetail component
export class DishdetailComponent implements OnInit {
    //@Input() changing to use routerLink
    dish: Dish;
    dishIds: number[];
    prev: number;
    next: number;

    constructor(private route: ActivatedRoute, private dishService: DishService, private location: Location) { }

    ngOnInit() {
        // getting all dish ids from observable
        this.dishService.getDishIds()
            .subscribe(ids => this.dishIds = ids);
        this.route.params.pipe(switchMap((params: Params) => this.dishService.getDish(Number(params['id']))))
            .subscribe(dish => {this.dish = dish; console.log(this.dish); this.setPrevNext(this.dish.id)});
        
        // this.dishService.getDish(id) //this was replaced by above subscription to change of current param=id in url
        //     .subscribe(dish => this.dish = dish)
            // for version with Promise
            // .then(dish => this.dish = dish)
            // .catch(errorString => console.log(errorString));
    }
    goBack(): void {
        // TODO: change it, so BACK button brings back to MENU, not the preavious location
        this.location.back();
    }
    // calculating previous and next dish to use with buttons in dishdetail card
    setPrevNext(dishId: number): void {
        const currentIndex = this.dishIds.indexOf(dishId);
        // need to enable going around meaning when on index 0 and prev clicked => goes to last item
        //this.prev = this.dishIds[(this.dishIds.length + currentIndex -1) % this.dishIds.length]; // from course
        // my solution
        this.prev = this.dishIds[currentIndex === 0 ? this.dishIds.length - 1 : currentIndex - 1];
        // course solution this.next = this.dishIds[(this.dishIds.length + currentIndex + 1) % this.dishIds.length];
        // my solution
        this.next = this.dishIds[currentIndex === this.dishIds.length - 1 ? 0 : currentIndex + 1];
    } 

}
