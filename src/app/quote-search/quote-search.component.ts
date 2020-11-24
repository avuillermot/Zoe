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
  cols: any[];
  @ViewChild('dt') table: Table;

  constructor(private router: Router, private servCalculEngine: CalculEngineService) {
    this.quotes = new Array<IDocument>();
    this.cols = new Array<any>(); 
    this.table = ViewChild('dt');}

  async ngOnInit(): Promise<void> {
    this.quotes = await this.servCalculEngine.getQuotes();

    //this.cols.push({ field: "_id", header: "Code" });
    this.cols.push({ field: "number", header: "Numéro" });
    this.cols.push({ field: "date", header: "Date" });
    this.cols.push({ field: "expirationDate", header: "Expire le" });
    this.cols.push({ field: "totalFreeTax", header: "Montant HT" });
    this.cols.push({ field: "total", header: "Montant TTC" });
  }

  filter($event: any, field: string, pattern: string): void {
    this.table.filter($event.target.value, field, pattern);
  }

  onClick(data: string): void {
    //this.router.navigate(['product/update/' + data]);
  }

}
