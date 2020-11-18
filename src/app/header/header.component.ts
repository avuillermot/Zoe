import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { UserService } from '../_services/user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  items: MenuItem[];

  constructor(private servUser: UserService) {
    this.items = new Array<MenuItem>();
  }

  ngOnInit(): void {
    this.items = [
      {
        label: this.servUser.User.email
      }
    ]
  }

}
