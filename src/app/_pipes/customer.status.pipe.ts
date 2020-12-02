import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'customerstatus' })
export class CustomerStatusPipe implements PipeTransform {

  private static status: { code: string, label: string }[] = [
    { code: "CREATE", label: "Créer" },
    { code: "UPDATE", label: "Mis à jour" }
  ];

  transform(value: string): string {
    let back: string = value;
    CustomerStatusPipe.status.forEach((input) => {
      if (input.code == value) back = input.label;
    });
    return back;
    
  }
}
