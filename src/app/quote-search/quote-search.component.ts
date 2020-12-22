import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Table } from 'primeng/table';
import { IQuote } from '../_services/calcul-engine/calcul-engine.model';
import { DocumentEngineService } from '../_services/document-engine/document-engine.service';

@Component({
  selector: 'app-quote-search',
  templateUrl: './quote-search.component.html',
  styleUrls: ['./quote-search.component.css']
})
export class QuoteSearchComponent implements OnInit {

  quotes: IQuote[];
  @ViewChild('dt') table: Table;

  constructor(private router: Router, private servDocument: DocumentEngineService) {
    this.quotes = new Array<IQuote>();
    this.table = ViewChild('dt');
  }

  async ngOnInit(): Promise<void> {
    let temp:IQuote[] = await this.servDocument.getAll('quotes');
    this.quotes = temp.sort((a, b) => (a.date < b.date) ? 1 : -1);
  }

  filter($event: any, field: string, pattern: string): void {
    this.table.filter($event.target.value, field, pattern);
  }

  filterStatus($event: any): void {
    let value: string = "";
    if ($event != null && $event.target != null && $event.target.value != null) value = $event.target.value;
    this.table.filter(value, 'status', 'equals');
  }

  onClick(data: IQuote): void {
    if (data.status == 'LOCK' || data.status == 'ACCEPT') this.router.navigate(['quote/lock/' + data._id]);
    else this.router.navigate(['quote/update/' + data._id]);
  }

}
