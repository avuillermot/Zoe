import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { environment } from "./../../environments/environment";
import { GlobalHelper } from "./../global.helper";

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

  constructor(private http: HttpClient, private fb: FormBuilder) {
    this.entity = { name: "", address1: "", address2: "", address3: "", zipCode: "", city: "", country: "", email: "" };
    this.contact = { email: "", firstName: "", lastName: "", password: "", confirmPassword: "" };
    this.countries = new Array<Country>();

    this.myFormEntity = this.fb.group(
      {
        name: ['', [Validators.required, Validators.minLength(1)]],
        address1: ['', [Validators.required, Validators.minLength(1)]],
        zipCode: ['', [Validators.required, Validators.minLength(5)]],
        city: ['', [Validators.required, Validators.minLength(1)]],
        country: ['FR', [Validators.required, Validators.minLength(1)]],
        email: ['', [Validators.email, Validators.required]]
      }
    );

    this.myFormContact = this.fb.group(
      {
        firstName: ['', [Validators.required, Validators.minLength(1)]],
        lastName: ['', [Validators.required, Validators.minLength(1)]],
        email: ['', [Validators.email, Validators.required]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
      },
      { validator: passwordValidator }
    );

  }

  ngOnInit(): void {
    this.http.get('https://localhost:8080/countries').subscribe(
      (data) => { this.countries = <Country[]>data },
      () => { },
      () => { }
    );
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
    const params = new HttpParams();
    const options = { params: params };

    GlobalHelper.waiting();
    this.http.post<void>(environment.services.entity + "entity/uncomplete", { entity: this.myFormEntity.value, owner: this.myFormContact.value }, options).toPromise()
      .then(() => {
        GlobalHelper.stopWainting();
        alert("Un mail vous a été envoyé pour confirmer votre adresse mail. Vous pourrez ensuite vous connecter.");
        window.location.href = '/login';
      })
      .catch((ex) => {
        GlobalHelper.stopWainting();
        if (ex.error == undefined) alert("Une erreur inconnue est survenue.");
        else if (ex.error == "EMAIL_ALREADY_EXIST") alert("Cette adresse mail est déjà utilisée. Vous pouvez réinitialiser votre mot de passe en d'oubli.");
        else alert("Une erreur inconnue est survenue.");
      });
  }

  Errors(): any[] {
    if (this.myFormContact.errors == null) return [{ reason: '', message:''}];
    return this.myFormContact.errors?.alls;
  }
}
