import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'productstatus' })
export class ProductStatusPipe implements PipeTransform {

  private static status: { code: string, label: string }[] = [
    { code: "CREATE", label: "Créer" },
    { code: "UPDATE", label: "Mis à jour" }
  ];

  transform(value: string): string {
    let back: string = value;
    ProductStatusPipe.status.forEach((input) => {
      if (input.code == value) back = input.label;
    });
    return back;
    
  }
}
