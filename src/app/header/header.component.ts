import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user/user.service';
import { IContext} from '../_services/context';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  context: IContext;
  constructor(private servUser: UserService) {
    this.context = { entity: "", login: "" };
  }

  async ngOnInit(): Promise<void> {
    this.context = await this.servUser.getContext();
  }

}
