import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { IDocument } from '../_services/calcul-engine/calcul-engine.model';
import { environment } from '../../environments/environment';
import { DocumentEngineService } from '../_services/document-engine/document-engine.service';
import { UserService } from '../_services/user/user.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import * as moment from "moment";


@Component({
  selector: 'app-child-tabpanel-viewpdf',
  templateUrl: './child-tabpanel-viewpdf.component.html',
  styleUrls: ['./child-tabpanel-viewpdf.component.css']
})
export class ChildTabpanelViewpdfComponent implements OnInit {

  @Input() typeDocument: string = "";
  @Input() document: IDocument = <IDocument>{};
  urlPdf: SafeResourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl("");
  htmlTemplate: string = "";
  keys: { [k: string]: any } = {};
  editorConfig: AngularEditorConfig = {
    height: '1100px',
    width: '980px',
    editable: true,
    uploadUrl: 'http://localhost:8000/v1/image'
  };

  constructor(private sanitizer: DomSanitizer, private servDocumentEngine: DocumentEngineService, private servUser: UserService) {
  }

  ngOnInit(): void {
    if (this.servDocumentEngine.isLocked(this.document.status) == false) {
      let fn: any = async () => {
        this.htmlTemplate = await this.servDocumentEngine.getTemplateQuote();
        this.document.html = this.htmlTemplate;
        this.dataBinding();
      };
      if (this.document.html != null || this.document.html == undefined || this.document.html == "") fn();
    }
    else this.urlPdf = this.sanitizer.bypassSecurityTrustResourceUrl(environment.services.pdf + "pdf/quote?id=" + this.document._id);
  }

  public onRefresh(): void {
    if (this.servDocumentEngine.isLocked(this.document.status) == false) this.dataBinding();
    else this.urlPdf = this.sanitizer.bypassSecurityTrustResourceUrl(environment.services.pdf + "pdf/quote?id=" + this.document._id);
  }
  
  public refresh(current: IDocument): void {
    if (current != null) this.document = current;
    if (this.servDocumentEngine.isLocked(this.document.status) == false) this.dataBinding();
    else this.urlPdf = this.sanitizer.bypassSecurityTrustResourceUrl(environment.services.pdf + "pdf/quote?id=" + this.document._id);
  }

  async dataBinding(): Promise<void> {

    let tempKeys: { [k: string]: any } = { };
    var elems: NodeListOf<Element> = window.document.querySelectorAll("*[data-binding]");
    elems.forEach((elem) => {
      let key: string | null | undefined = elem?.getAttribute("data-binding");
      let type: string | null | undefined = elem?.getAttribute("data-type");
      
      if (key != null) {
        let res: string = key.split('.').reduce(function (o: any, k: any) {
          return o && o[k];
        }, this);


        if (type != null && type != undefined) {
          if (type == 'date') res = moment(res).format('DD/MM/YYYY');
        }

        let key2: string = key;
        while (key2.indexOf(".") > -1) key2 = key2.replace(".", "");

        if (elem.textContent == "" || elem.textContent == null || elem.textContent == undefined) elem.textContent = res;
        else elem.textContent = elem.textContent.replace(this.keys[key2], res);
        
        tempKeys[key2] = res;
      }
    });
    this.keys = tempKeys;

    let contentItems: Element | null = window.document.querySelector(".document-body");
    if (contentItems != null) {
      contentItems.childNodes.forEach(current => current.remove());
      this.document.items.forEach((current) => {
        let div1: Element = window.document.createElement("div");
        div1.textContent = current.name;
        if (contentItems != null) contentItems.appendChild(div1);
      });

    }

    let html: string | undefined = window.document.querySelector("#document-content")?.outerHTML;
    if (html != undefined) this.document.html = html;
  }

  openPdf(): void {
    window.open(environment.services.pdf + "pdf/quote?id=" + this.document._id);
  }

  isLocked(): boolean {
    return this.servDocumentEngine.isLocked(this.document.status);
  }
}

