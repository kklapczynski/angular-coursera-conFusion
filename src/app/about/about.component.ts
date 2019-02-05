import { Component, OnInit } from '@angular/core';
import { Leader } from '../shared/leader';
// import { LEADERS } from '../shared/leaders';
import { LeaderService } from '../services/leader.service';
import { flyInOut, expand } from '../animations/app.animations';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
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
export class AboutComponent implements OnInit {
    leaders: Leader[];
    constructor(private leaderService: LeaderService) { }

    ngOnInit() {
        this.leaderService.getLeaders()
            .subscribe(leaders => this.leaders = leaders);
            // .then(leaders => this.leaders = leaders);
    }

}
