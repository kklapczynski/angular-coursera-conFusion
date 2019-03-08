// good practice: provide base URL of the server to be able to configure it easily
// export const baseURL = 'http://localhost:3000/';    // url of json-server runing locally
export const baseURL = 'https://ng-confusion.firebaseio.com/';  // url of firebase database
// to make this const available in app declare it in app.module.ts:
// import { baseURL } from './shared/baseurl';
// declare it in providers array as:
// {provide: 'BaseURL' , useValue: baseURL}