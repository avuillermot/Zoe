import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'documentstatus' })
export class DocumentStatusPipe implements PipeTransform {

  private static status: { code: string, label: string }[] = [
    { code: "CREATE", label: "Créé" },
    { code: "UPDATE", label: "Mis à jour" },
    { code: "LOCK", label: "Validé" }
  ];

  transform(value: String): String {
    let back: String = value;
    DocumentStatusPipe.status.forEach((input) => {
      if (input.code == value) back = input.label;
    });
    return back;
    
  }
}
