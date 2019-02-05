import { Component, OnInit, Inject } from '@angular/core';
import { Dish } from '../shared/dish';
// TODO: remove DISHES from here and create separate file to store it in central location: "shared" folder
// import { DISHES } from '../shared/dishes';
// TODO: replace importing directly DISHES by using service
import { DishService } from '../services/dish.service';
import { flyInOut, expand } from '../animations/app.animations';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  host: {
    '[@flyInOut]': '',
    'style': 'display: block;'  // TODO: animation doesn't work well, cause when route changes component is added
  },                            // dispayed as a block so previous one jumps down under new one, so no fly
                                // effect achieved; fixed / absolute positioning should be used
                                // but then there is problem of overlapping with footer
  animations: [
      flyInOut(),
      expand()
  ]
})
export class MenuComponent implements OnInit {

    dishes: Dish[];
    // changing to routerLink
    // selectedDish: Dish;
    errorMessage: string;   // string to display to the user when error occurs
    constructor(
        private dishService: DishService,
        @Inject('BaseURL') private BaseURL      // way to inject value, cause it is not a class as service is
        ) { }                                   // need to use it in template to provide src of images from server

    ngOnInit() {
        this.dishService.getDishes()
            .subscribe(
                dishes => this.dishes = dishes,         // success path: observable resolves to success
                error => this.errorMessage = <any>error);    // error path: observable resolves to error
    }
    // changing to routerLink
    // onSelect(dish: Dish) {
    //     this.selectedDish = dish;
    // }
}
