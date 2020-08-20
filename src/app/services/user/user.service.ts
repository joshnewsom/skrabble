import { Injectable } from '@angular/core';

import { User } from 'src/app/classes/user';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  public user?: User;

  constructor() {
    const token = localStorage.getItem('sk-token');
    if (token) {
      this.setUserFromToken(token);
      console.log('this.user (from storage):', this.user);
    }
  }

  readUserFromToken(token: string): User {
    const user: User = new User(JSON.parse(atob(token.split('.')[1])));
    return user;
  }

  setUser(user: User): void {
    this.user = user;
  }

  setUserFromToken(token: string): void {
    const user = this.readUserFromToken(token);
    this.setUser(user);
  }

  storeToken(token: string): void { // JTN maybe not a good idea?  should research alternatives
    localStorage.setItem('sk-token', token);
  }
}
