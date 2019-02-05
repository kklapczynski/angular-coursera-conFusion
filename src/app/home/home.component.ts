import { Component, OnInit, Inject } from '@angular/core';

import { DishService } from '../services/dish.service';
import { PromotionService } from '../services/promotion.service';
import { LeaderService } from '../services/leader.service';

import { Dish } from '../shared/dish';
import { Promotion } from '../shared/promotion';
import { Leader } from '../shared/leader';
import { flyInOut, expand } from '../animations/app.animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  host: {
    '[@flyInOut]': '',
    'style': 'display: block;'    // TODO: animation doesn't work well, cause when route changes component is added
                                  // dispayed as a block so previous one jumps down under new one, so no fly
                                  // effect achieved; fixed / absolute positioning should be used
                                  // but then there is problem of overlapping with footer
  },
  animations: [
      flyInOut(),
      expand()
  ]
})
export class HomeComponent implements OnInit {
    dish: Dish;
    promotion: Promotion;
    leader: Leader;
    dishErrorMessage: string;

    constructor(private dishService: DishService,
        private promotionService: PromotionService,
        private leaderService: LeaderService,
        @Inject('BaseURL') private BaseURL) { }

    ngOnInit() {
        this.dishService.getFeaturedDish()
            .subscribe(
                dish => this.dish = dish,
                error => this.dishErrorMessage = <any>error
            );
        this.promotionService.getFeaturedPromotion()
            .subscribe(promotion => this.promotion = promotion);
            // .then(promotion => this.promotion = promotion);
        this.leaderService.getFeaturedLeader()
            .subscribe(leader => this.leader = leader);
            // .then(leader => this.leader = leader);
    }

}
