import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { UserService } from '../_services/user/user.service';

@Component({
  selector: 'app-workflow-send-mail',
  templateUrl: './workflow-send-mail.component.html',
  styleUrls: ['./workflow-send-mail.component.css']
})
export class WorkflowSendMailComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  goBack() {
    window.location.href = UserService.getReturnUrl();
  }

}
