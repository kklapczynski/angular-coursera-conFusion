import { Component, OnInit, ViewChild } from '@angular/core';
import {FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Feedback, ContactType } from '../shared/feedback';
import { flyInOut, visibility2, expand } from '../animations/app.animations';
import { FeedbackService } from '../services/feedback.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  host: {
    '[@flyInOut]': '',
    'style': 'display: block;'    // TODO: animation doesn't work well, cause when route changes component is added
                                  // dispayed as a block so previous one jumps down under new one, so no fly
                                  // effect achieved; fixed / absolute positioning should be used
                                  // but then there is problem of overlapping with footer
  },
  animations: [
      flyInOut(),
      visibility2(),
      expand()
  ]
})
export class ContactComponent implements OnInit {

  feedbackForm: FormGroup;
  feedback: Feedback;
  feedbackReturnedFromServer: Feedback;
  sendingFeedback: boolean;
  displayConfirmation: boolean;
  contactType = ContactType;

  @ViewChild('fform') feedbackFormDirective;

  formErrors = {
    'firstname': '',
    'lastname': '',
    'telnum': '',
    'email': ''
  };

  validationMessages = {
    'firstname': {
      'required': 'First name is required.',
      'minlength': 'First name has to have at least 3 characters.',
      'maxlength': 'First name can be max 25 char long.'
    },
    'lastname': {
      'required': 'Last Name is required.',
      'minlength':'Last Name must be at least 3 characters long.',
      'maxlength':'Last Name cannot be more than 25 characters long.'
    },
    'telnum': {
      'required': 'Tel. number is required.',
      'pattern':   'Required pattern 111-222-3333'
    },
    'email': {
      'required':      'Email is required.',
      'email':         'Email not in valid format.'
    }
  }

  constructor(private fb: FormBuilder, private feedbackService: FeedbackService) {
    this.createForm();
  }

  ngOnInit() {
  }

  createForm() {
    this.feedbackForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
      lastname: ['', [Validators.required, Validators.minLength(3) ,Validators.maxLength(25)]],
      telnum: ['', [Validators.required, Validators.pattern('[0-9]{3}-[0-9]{3}-[0-9]{4}')]],
      email: ['', [Validators.required, Validators.email]],
      agree: false,
      contacttype: 'None',
      message: ''
    });

    this.feedbackForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged();  // set error messages when form created
  }

  onValueChanged(data?: any) {
    if(!this.feedbackForm) return;

    const form = this.feedbackForm;

    for (const field in this.formErrors) {
      if(this.formErrors.hasOwnProperty(field)) {
        this.formErrors[field] = '';
        const control = form.get(field);
        if(control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            this.formErrors[field] += messages[key];
          }
        }
      }
    }
  }

  onSubmit() {
    // show spinner and remove (*ngIf) form from view
    this.sendingFeedback = true;

    // get values from form group object
    this.feedback = this.feedbackForm.value;

    //use service to post feedback to the server
    this.feedbackService.submitFeedback(this.feedback)
      .subscribe(
        feedback => {
          // server returned feedback object
          this.feedbackReturnedFromServer = feedback;
          // hide spinner
          this.sendingFeedback = false;

          // display submission confirmation
          this. displayConfirmation = true;
// TODO: better solution from peer reviews: C:\Krzysztof\Programming\_COURSERA\Coursera_FullStack\Angular\coursera_peer_reviews\Assignment_4\2
// resetForm a bit different: includes flags switching and used in setOut() AND form with [hidden] NOT with *ngIf
          // hide submission confirmation after 5s
          setTimeout( () => this.displayConfirmation = false, 5000);
          setTimeout( () => this.resetFeedbackForm(), 5001);
          // TODO: try to replace above with .map(timeOut 5s) and .mergeMap(resetForm)
          // https://stackoverflow.com/questions/34104638/how-to-chain-http-calls-in-angular2
        },
        error => { console.log(`feedback not submitted cause of error: ${error}`)}
      )
  }
// see: https://stackoverflow.com/questions/44575494/angular-2-formcontrol-reset-doesnt-work-but-resetform-does-but-typescrip

  resetFeedbackForm() {
    // reset view
    this.feedbackFormDirective.resetForm(
      {
        firstname: '',
        lastname: '',
        telnum: '',
        email: '',
        agree: false,
        contacttype: 'None',
        message: ''
      }
    );
    // reset data
    this.feedback = this.feedbackForm.value;
  }
}
