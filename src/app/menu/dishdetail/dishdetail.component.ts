import { Component, OnInit, Input } from '@angular/core';
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
    @Input()
    dish: Dish;
    constructor() { }

    ngOnInit() {
    }

}
