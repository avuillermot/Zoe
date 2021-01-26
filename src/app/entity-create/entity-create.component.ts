import { Component, OnInit } from '@angular/core';
import { EntityCreateService } from '../_services/entity/entity-create.service';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators, ValidatorFn, FormControl, AbstractControl } from '@angular/forms';

interface Country {
  code: string,
  label:string
}

const passwordValidator: ValidatorFn = (control: AbstractControl) => {
  const confirm = control.get("confirmPassword") || null;
  const password = control.get("password") || null;

  let back: any[] = new Array();
  let hasError: boolean = false;
  control.get("confirmPassword")?.setErrors(null);
  control.get("password")?.setErrors(null);

  if (confirm == null || password == null) {
    hasError = true;
    control.get("confirmPassword")?.setErrors({ error: true });
    control.get("password")?.setErrors({ error: true });
    back.push({ reason: "confirmPassword", message: 'Les mots de passe ne peuvent pas être nulle.' });
  };

  if (password?.value.length < 6) {
    hasError = true;
    control.get("password")?.setErrors({ error: true });
    back.push({ reason: "password", message: '6 caractères minimum.' });
  };

  if (confirm?.value != password?.value) {
    hasError = true;
    control.get("confirmPassword")?.setErrors({ error: true });
    control.get("password")?.setErrors({ error: true });
    back.push({ reason: "confirmPassword", message: 'Les mots de passe sont différents.' });
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

  myFormEntity: FormGroup;
  displayEntity: boolean = true;
  myFormContact: FormGroup;
  displayContact: boolean = false;

  public entity: {
    name: string, address1: string, address2: string, address3: string, zipCode: string, city: string, country: string, email: string
  }
  public contact: {
    email: string, firstName: string, lastName: string, password: string, confirmPassword: string
  }

  public countries: Country[];

  constructor(private serv: EntityCreateService, private http: HttpClient, private fb: FormBuilder) {
    this.entity = { name: "", address1: "", address2: "", address3: "", zipCode: "", city: "", country: "", email: "" };
    this.contact = { email: "", firstName: "", lastName: "", password: "", confirmPassword: "" };
    this.countries = new Array<Country>();
    /*this.http.get('https://localhost:8080/countries').subscribe(
      () => { },
      () => { },
      () => { }
    );*/
    this.countries.push({ code: 'FR', label: 'France' });
    this.countries.push({ code: 'BE', label: 'Belgique' });

    this.myFormEntity = this.fb.group(
      {
        name: ['aaa', [Validators.required, Validators.minLength(1)]],
        address1: ['bbbbb', [Validators.required, Validators.minLength(1)]],
        zipCode: ['21160', [Validators.required, Validators.minLength(5)]],
        city: ['Dijon', [Validators.required, Validators.minLength(1)]],
        country: ['FRANCE', [Validators.required, Validators.minLength(1)]],
        email: ['pp@p.com', [Validators.email, Validators.required]]
      }
    );

    this.myFormContact = this.fb.group(
      {
        firstName: ['aaa', [Validators.required, Validators.minLength(1)]],
        lastName: ['bbb', [Validators.required, Validators.minLength(1)]],
        email: ['mmmm', [Validators.email, Validators.required]],
        password: ['111', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['111', [Validators.required, Validators.minLength(6)]]
      },
      { validator: passwordValidator }
    );

  }

  ngOnInit(): void {
  }

  next(): void {
    this.displayEntity = false;
    this.displayContact = true;
  }

  previous(): void {
    this.displayEntity = true;
    this.displayContact = false;
  }

  onCreate(): void {
    this.serv.create(this.myFormEntity.value, this.myFormContact.value);
  }

  Errors(): any[] {
    if (this.myFormContact.errors == null) return [{ reason: '', message:''}];
    return this.myFormContact.errors?.alls;
  }
}
