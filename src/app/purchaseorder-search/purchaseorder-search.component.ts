import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Table } from 'primeng/table';
import { IPurchaseOrder } from '../_services/calcul-engine/calcul-engine.model';
import { CalculEngineService } from '../_services/calcul-engine/calcul-engine.service';

@Component({
  selector: 'app-purchaseorder-search',
  templateUrl: './purchaseorder-search.component.html',
  styleUrls: ['./purchaseorder-search.component.css']
})
export class PurchaseorderSearchComponent implements OnInit {

  pos: IPurchaseOrder[];
  @ViewChild('dt') table: Table;

  constructor(private router: Router, private servCalculEngine: CalculEngineService) {
    this.pos = new Array<IPurchaseOrder>();
    this.table = ViewChild('dt');
  }

  async ngOnInit(): Promise<void> {
    this.pos = await this.servCalculEngine.getAll('purchaseorders');
  }

  filter($event: any, field: string, pattern: string): void {
    this.table.filter($event.target.value, field, pattern);
  }

  onClick(data: string): void {
    this.router.navigate(['purchaseorder/update/' + data]);
  }

}
