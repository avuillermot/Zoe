import { Component, OnInit } from '@angular/core';
import { EntityCreateService } from '../_services/entity/entity-create.service';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators, ValidatorFn, FormControl, AbstractControl } from '@angular/forms';

const passwordValidator: ValidatorFn = (control: AbstractControl) => {
  const confirm = control.get("confirm") || null;
  const password = control.get("password") || null;

  let back: any[] = new Array();
  let hasError: boolean = false;
  control.get("confirm")?.setErrors(null);
  control.get("password")?.setErrors(null);

  if (confirm == null || password == null) {
    hasError = true;
    control.get("confirm")?.setErrors({ error: true });
    control.get("password")?.setErrors({ error: true });
    back.push({ reason: "confirmPassword", message: 'Les mots de passe ne peuvent pas être nulle' });
  };

  if (confirm?.value != password?.value) {
    hasError = true;
    control.get("confirm")?.setErrors({ error: true });
    control.get("password")?.setErrors({ error: true });
    back.push({ reason: "confirmPassword", message: 'Les mots de passe sont différents' });
  };

  if (hasError == false) return null;
  else return { alls: back };
};

@Component({
  selector: 'app-entity-create',
  templateUrl: './entity-create.component.html',
  styleUrls: ['./entity-create.component.css']
})
export class EntityCreateComponent implements OnInit {

  myFormValidator: FormGroup;

  public entity: {
    name: string, address1: string, address2: string, address3: string, zipCode: string, city: string, country: string, email: string
  }
  public contact: {
    email: string, firstName: string, lastName: string, password: string, confirmPassword: string
  }

  public countries: string[];

  constructor(private serv: EntityCreateService, private http: HttpClient, private fb: FormBuilder) {
    this.entity = { name: "", address1: "", address2: "", address3: "", zipCode: "", city: "", country: "", email: "" };
    this.contact = { email: "", firstName: "", lastName: "", password: "", confirmPassword: "" };
    this.countries = new Array<string>();
    this.http.get('https://pc-246.home:8091/countries').subscribe(
      () => { },
      () => { },
      () => { }
    );

    this.myFormValidator = this.fb.group(
      {
        name: [null, [Validators.required, Validators.minLength(1)]],
        password: [null, Validators.required],
        confirm: [null, Validators.required]
      },
      { validator: passwordValidator }
    );
  }

  ngOnInit(): void {
  }

  onCreate(): void {
    debugger;
    //this.serv.create(this.entity, this.contact);
  }

  Errors(): any[] {
    if (this.myFormValidator.errors == null) return [{ reason: '', message:''}];
    return this.myFormValidator.errors?.alls;
  }
}
