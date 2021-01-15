import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user/user.service';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { AuthInterceptor } from '../_services/auth.interceptor';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  email: string = "";
  login: string = "";
  password: string = "";
  modeLostPassword: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router, private servUser:UserService) { }

  ngOnInit(): void {
    AuthInterceptor.logout();
  }

  onLogon(logonForm: NgForm): void {
    if (logonForm.form.status != "VALID") alert("Merci de sasisir votre adresse mail et mot de passe.");
    else this.servUser.logon(this.login, this.password);

  }

  async onRecoverPassword(pwdForm: NgForm): Promise<void> {
    if (pwdForm.form.status != "VALID") alert("Merci de sasisir votre adresse mail.");
    else {
      try {
        await this.servUser.newPassword(this.email);
        alert("Votre demande est en cours de traitement. Votre mot de passe vous sera envoyé dans quelques minutes.");
        this.modeLostPassword = false;
        this.email = "";
      }
      catch (ex) {
        if (ex.error == "EMAIL_NOT_FOUND") alert("Adresse mail inconnue");
        else alert("Une erreur est survenue.")
      }
    }
  }
}
