import { Component, OnInit, ViewChild } from '@angular/core';
import {FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Feedback, ContactType } from '../shared/feedback';
import { stringify } from 'querystring';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  
  feedbackForm: FormGroup;
  feedback: Feedback;
  contactType = ContactType;

  @ViewChild('fform') feedbackFormDirective;

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  ngOnInit() {
  }

  createForm() {
    this.feedbackForm = this.fb.group({
      firstname: ['', Validators.required, Validators.minLength(3)],
      lastname: ['', Validators.required, Validators.minLength(3)],
      telnum: ['', Validators.required, Validators.pattern('[0-9]{3}-[0-9]{3}-[0-9]{4}')],
      email: ['', Validators.required],
      agree: false,
      contacttype: 'None',
      message: ''
    });
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
