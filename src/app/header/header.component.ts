import { Component, OnInit } from '@angular/core';
import { User } from '../_services/user/user.model';
import { AuthInterceptor } from '../_services/auth.interceptor';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user: User|null = new User();
  constructor() {}

  ngOnInit(): void {
    let token: string | null = localStorage.getItem('token');
    if (token != null && token != undefined) this.user = <User> JSON.parse(token);
  }

}
