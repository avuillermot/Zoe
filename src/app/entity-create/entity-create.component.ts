import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-entity-create',
  templateUrl: './entity-create.component.html',
  styleUrls: ['./entity-create.component.css']
})
export class EntityCreateComponent implements OnInit {

  public entity: {
    name: string, address1: string, address2: string, address3: string, zipCode: string, city: string, country: string, email: string
  }
  public contact: {
    email: string, firstName: string, lastName: string
  }

  constructor() {
    this.entity = { name: "", address1: "", address2: "", address3: "", zipCode: "", city: "", country: "", email: "" };
    this.contact = { email: "", firstName: "", lastName: "" };
  }

  ngOnInit(): void {
  }

}
