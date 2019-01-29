import { Component, OnInit, Inject } from '@angular/core';
import { Dish } from '../shared/dish';
// TODO: remove DISHES from here and create separate file to store it in central location: "shared" folder
// import { DISHES } from '../shared/dishes';
// TODO: replace importing directly DISHES by using service
import { DishService } from '../services/dish.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

    dishes: Dish[];
    // changing to routerLink
    // selectedDish: Dish;
    constructor(
        private dishService: DishService,
        @Inject('BaseURL') private BaseURL      // way to inject value, cause it is not a class as service is
        ) { }                                   // need to use it in template to provide src of images from server

    ngOnInit() {
        this.dishService.getDishes()
            .subscribe(dishes => this.dishes = dishes);
    }
    // changing to routerLink
    // onSelect(dish: Dish) {
    //     this.selectedDish = dish;
    // }
}
