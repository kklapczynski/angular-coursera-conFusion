import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { DishService } from '../../services/dish.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { Dish } from '../../shared/dish';
import { switchMap } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { visibility, expand } from '../../animations/app.animations';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss'],
  animations: [
      visibility(),
      expand()
  ]
})
// TODO: this component needs to be able to receive and use data of selected "dish":
    // 1.Add event binding and handler in menu component: click on mat-grid-tile = dish
    // 2.Pass selected dish to dishdetail component
export class DishdetailComponent implements OnInit {
    //@Input() changing to use routerLink
    dish: Dish;
    dishCopy: Dish;
    dishIds: number[];
    prev: number;
    next: number;
    commentForm: FormGroup;
    errorMessage: string;
    visibility = 'shown';   // property of component: initial value -> 'shown' after dish chosen in menu component
                            // TODO: check ES6 classes (in UDEMY course info, that classes cannot have properties inherited - only mathods)
    @ViewChild('cform') commentFormDirective;

    formErrors = {
        'author': '',
        'comment': ''
    }

    validationMessages = {
        'author': {
            'required': 'Your name is required. ',
            'minlength': 'Your name should be min 2 characters long. '
        },
        'comment': {
            'required': 'Comment is required. ',
            'pattern': 'Space at start or end and double or more spaces not allowed. '
        }
    }

    constructor(private route: ActivatedRoute, private dishService: DishService, private location: Location,
        private fb: FormBuilder, @Inject('BaseURL') private BaseURL) { }

    ngOnInit() {
        // getting all dish ids from observable
        this.dishService.getDishIds()
            .subscribe(
                ids => this.dishIds = ids,
                error => this.errorMessage = <any>error);
        this.route.params
            .pipe(switchMap(
                    (params: Params) => {
                        this.visibility = 'hidden'; // hide current dish when new one requested from server
                        return this.dishService.getDish(Number(params['id']));
                    })
            )
            .subscribe(
                dish => {this.dish = dish; this.dishCopy = dish;
                            this.setPrevNext(this.dish.id);
                            this.visibility = 'shown'}, // show new dish when observable resloved successfully
                error => this.errorMessage = <any>error
            );

        // this.dishService.getDish(id) //this was replaced by above subscription to change of current param=id in url
        //     .subscribe(dish => this.dish = dish)
            // for version with Promise
            // .then(dish => this.dish = dish)
            // .catch(errorString => console.log(errorString));

        this.createForm();
    }

    createForm() {
        this.commentForm = this.fb.group({
            author: ['',[Validators.required, Validators.minLength(2)]],
            rating: [5],
            comment: ['',[Validators.required, Validators.pattern('^\\S+(?: \\S+)*$')]]
            // REGEX: no space at start or end or more then 1 space in a row ('\' before '\' so the final is: '^\S+(?: \S+)*$' )
        });

        this.commentForm.valueChanges
            .subscribe(formData => this.onValueChange(formData));

        this.onValueChange();
    }

    onValueChange(data?: any) {
        // console.log(`onValueChange: formData from valueChanges Observable: ${data}`);
        // console.log(data);
        const form = this.commentForm;
        for (const field in this.formErrors) {
            this.formErrors[field] = '';
            const control = form.get(field);
            if (control && control.dirty) {
                for (const error in control.errors) {
                    this.formErrors[field] += this.validationMessages[field][error];
                }
            }

        }
        // console.log(`formErrors:`);
        // console.log(this.formErrors);
        // console.log(this.commentForm);
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

    onSubmit() {
        const date = new Date();
        const commentFormControls = this.commentForm.controls;
        // we are using dishCopy to send it to server with putDish method, so the view will be updated
        // with new comment only when saving om server is successful:
        // dish object returned and saved in this.dish
        this.dishCopy.comments.push({
            rating: commentFormControls['rating'].value,
            comment: commentFormControls['comment'].value,
            author: commentFormControls['author'].value,
            date: date.toISOString()
        });

        this.dishService.putDish(this.dishCopy)
            .subscribe(
                dish => { this.dish = dish; this.dishCopy = dish },
                error => { this.dish = null; this.dishCopy = null; this.errorMessage = <any>error;}
            )

        // this.commentForm.reset();    this resets all controls values to null and inputs are marked as invalid

        // this.commentForm.reset(
        //     {
        //         author: {value: '', disabled: false},  // this works only with disabled: true or false
        //         rating: [5],
        //         comment: ''
        //     }
        // );  // sets values alright but still marked as invalid = red I think ng-touched causes that
        // because of a problem with marking required fields red automatically after reset,
        // we use below method
        this.commentFormDirective.resetForm(
            {
                author: '',
                rating: [5],
                comment: ''
            }
        );
    }

}
