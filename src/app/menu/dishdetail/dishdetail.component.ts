import { Component, OnInit } from '@angular/core';
import { DishService } from '../../services/dish.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Dish } from '../../shared/dish';


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
    constructor(private route: ActivatedRoute, private dishService: DishService, private location: Location) { }

    ngOnInit() {
        const id = +this.route.snapshot.params['id'];
        this.dishService.getDish(id)
            .then(dish => this.dish = dish)
            .catch(errorString => console.log(errorString));
    }
    goBack(): void {
        this.location.back();
    }

}
