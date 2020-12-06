import { Component, Input } from '@angular/core';
import { IStatus } from '../_services/calcul-engine/calcul-engine.model';

@Component({
  selector: 'app-child-tabpanel-status',
  templateUrl: './child-tabpanel-status.component.html',
  styleUrls: ['./child-tabpanel-status.component.css']
})
export class ChildTabpanelStatusComponent {

  @Input() statusHistory: IStatus[] = new Array<IStatus>();

  constructor() { }

}
