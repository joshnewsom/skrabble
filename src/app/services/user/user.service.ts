import { Injectable } from '@angular/core';

import { User } from 'src/app/classes/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public user?: User;

  constructor() {
    this.user = JSON.parse(localStorage.getItem('sk-user'));
  }

  setUser(user: User) {
    this.user = user;
    localStorage.setItem('sk-user', JSON.stringify(user));
  }
}
