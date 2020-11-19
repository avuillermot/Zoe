import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user/user.service';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  login: string = "confirm@test.com";
  password: string = "vipSOTUwEs"

  constructor(private route: ActivatedRoute, private router: Router, private servUser:UserService) { }

  ngOnInit(): void {
  }

  onLogon(logonForm: NgForm): void {
    this.servUser.logon(this.login, this.password);
  }

}
