import { Component, OnInit, ViewChild } from '@angular/core';
import {FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Feedback, ContactType } from '../shared/feedback';
import { flyInOut } from '../animations/app.animations';

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
      flyInOut()
  ]
})
export class ContactComponent implements OnInit {

  feedbackForm: FormGroup;
  feedback: Feedback;
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

  constructor(private fb: FormBuilder) {
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
            // if (control.errors.hasOwnProperty(key))  // not needed imo
            this.formErrors[field] += messages[key];
          }
        }
      }
    }
    // console.log(this.formErrors);

  }

  onSubmit() {
    this.feedback = this.feedbackForm.value;
    console.warn(this.feedback);
    // this.feedbackForm.reset();
    // reset using ViewChild does the job of below reset, taht is why it is commented out
    // this.feedbackForm.reset(
    //   {
    //     firstname: '',
    //     lastname: '',
    //     telnum: '',
    //     email: '',
    //     agree: false,
    //     contacttype: 'None',
    //     message: ''
    //   }
    // );
    // this.feedback = this.feedbackForm.value;
    // console.log('this.feedback after reset:');
    // console.warn(this.feedback);
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
    this.feedback = this.feedbackForm.value;
    console.log('this.feedback after reseting ngForm using ViewChild:');
    console.warn(this.feedback);
  }
}
