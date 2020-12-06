import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WorkflowHelperService {

  constructor() { }

  public static manageIcons(container: Element | null, status: string) {

    if (container != null) {
      container.querySelectorAll("#workflow button")?.forEach((current: Element) => {
        (<any>current).style.display = 'inline-block';
      });

      if (status == "INIT") {
        container.querySelectorAll("#workflow button")?.forEach((current: Element) => {
          (<any>current).style.display = 'none';
        });
      }

      if (status == "LOCK") {
        container.querySelectorAll("#workflow button.not-always")?.forEach((current: Element) => {
          (<any>current).style.display = 'none';
        });
      }
    }
  }
}
