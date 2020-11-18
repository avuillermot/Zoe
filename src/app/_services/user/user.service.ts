import { Injectable } from '@angular/core';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public User: User;

  constructor() {
    this.User = new User();
  }
}
