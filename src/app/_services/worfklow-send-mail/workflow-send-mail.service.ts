import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WorkflowSendMailService {

  private static url:string = "workflow/send-mail/:typedocument/:id"

  constructor() { }

  public static navigateTo(typeDocument: string, id: string):string {
    return this.url.replace(":typedocument", typeDocument).replace(":id", id);
  }


}
