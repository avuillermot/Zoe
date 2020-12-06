import { Component, Input } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-child-tabpanel-viewpdf',
  templateUrl: './child-tabpanel-viewpdf.component.html',
  styleUrls: ['./child-tabpanel-viewpdf.component.css']
})
export class ChildTabpanelViewpdfComponent {

  @Input() id: string = "";
  @Input() typeDocument: string = "";
  @Input() statusDocument: string = "";
  urlPdf: SafeResourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl("");

  constructor(private sanitizer: DomSanitizer) { }

  refresh(): void {
      let self = this;
      let fn = function () {
        self.urlPdf = self.sanitizer.bypassSecurityTrustResourceUrl(environment.services.calculEngine + self.typeDocument + "/pdf?id=" + self.id);
      };
      window.setTimeout(fn, 500);
  }

  ngOnChanges(): void {
    this.refresh();
  }
}
