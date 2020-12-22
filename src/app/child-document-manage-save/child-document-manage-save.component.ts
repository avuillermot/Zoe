import { Component, Input } from '@angular/core';
import { IDocument } from '../_services/calcul-engine/calcul-engine.model';
import { DocumentEngineService } from '../_services/document-engine/document-engine.service';
import { ActivatedRoute, Router } from "@angular/router";
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-child-document-manage-save',
  templateUrl: './child-document-manage-save.component.html',
  styleUrls: ['./child-document-manage-save.component.css'],
  providers: [ConfirmationService]
})
export class ChildDocumentManageSaveComponent {

  @Input() document: IDocument = <IDocument>{};
  @Input() typeDocument:string = ""
  blocked: boolean = false;
  popupMessage: string = "";
  popupDisplay: boolean = false;

  constructor(private servDocument: DocumentEngineService, private router: Router, private route: ActivatedRoute, private confirmationService: ConfirmationService) { }

  async onSave(): Promise<void> {
    let elems: NodeListOf<Element> = document.querySelectorAll('.ng-invalid');
    if (elems.length == 0) {
      let id: string | null = this.route.snapshot.paramMap.get("id");
      this.blocked = true;
      if (id == null) {
        try {
          let back: { _id: string } = await this.servDocument.create(this.document, this.typeDocument);
          this.router.navigate([this.typeDocument + '/update/' + back._id]);
        }
        catch (ex) {
          this.displayMessage(ex.error);
        }
      }
      else await this.servDocument.update(this.document, this.typeDocument);
      this.blocked = false;
    }
    else this.displayMessage("Veuillez remplir les champs obligatoires.");
  }

  async runLock(): Promise<void> {
    let elems: NodeListOf<Element> = document.querySelectorAll('.ng-invalid');
    if (elems.length == 0) {
      this.blocked = true;
      try {
        await this.servDocument.lock(this.document, this.typeDocument);
        this.router.navigate([this.typeDocument + '/lock/' + this.document._id]);
      }
      catch (ex) {
        this.displayMessage(ex.error);
      }
    }
    else this.displayMessage("Veuillez remplir les champs obligatoires.");
  }

  async onLock() {
    this.confirmationService.confirm({
      message: 'Voulez-vous valider ce document ? Un document validé ne pourra pas être modifié.',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: async () => {
        await this.runLock();
      },
      reject: () => {
      }
    });
  }

  displayMessage(message: string): void {
    if (message == null || message == undefined) this.popupMessage = "Une erreur est survenue"
    else this.popupMessage = message;
    this.popupDisplay = true;
    this.blocked = false;
  }

  isLocked(): boolean {
    return this.servDocument.isLocked(this.document.status);
  }
}
