import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Table } from 'primeng/table';
import { IDocument, IItemLine } from '../_services/calcul-engine/calcul-engine.model';
import { CalculEngineService } from '../_services/calcul-engine/calcul-engine.service';

@Component({
  selector: 'app-quote-search',
  templateUrl: './quote-search.component.html',
  styleUrls: ['./quote-search.component.css']
})
export class QuoteSearchComponent implements OnInit {

  quotes: IDocument[];
  @ViewChild('dt') table: Table;

  constructor(private router: Router, private servCalculEngine: CalculEngineService) {
    this.quotes = new Array<IDocument>();
    this.table = ViewChild('dt');}

  async ngOnInit(): Promise<void> {
    this.quotes = await this.servCalculEngine.getQuotes();
  }

  filter($event: any, field: string, pattern: string): void {
    this.table.filter($event.target.value, field, pattern);
  }

  onClick(data: string): void {
    this.router.navigate(['quote/update/' + data]);
  }

}
