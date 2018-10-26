import { Injectable } from '@angular/core';
import { Leader } from '../shared/leader';
import { LEADERS } from '../shared/leaders';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor() { }

  getLeaders(): Promise<Leader[]> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(LEADERS);
      }, 2000);
    });
    // return Promise.resolve(LEADERS);
  }

  getLeader(id: number): Leader {
    return LEADERS.filter((leader) => (leader.id === id))[0];
  }

  getFeaturedLeader(): Promise<Leader> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(LEADERS.filter((leader) => (leader.featured))[0]);
      }, 2000);
    });
    // return Promise.resolve(LEADERS.filter((leader) => (leader.featured))[0]);
  }
  
}
