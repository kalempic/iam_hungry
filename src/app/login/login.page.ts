import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { LoadingController, AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';
import {AuthService} from "../auth.service";
import {AuthResponseData} from "../auth.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  isLoading = false;

  constructor(
  private alertCtrl: AlertController,
  private authService: AuthService,
  private router: Router,
  private loadingCtrl: LoadingController,

  ) { }

  ngOnInit() {
  }
  autentikacija(email: string, password: string) {
    this.isLoading = true;
    this.loadingCtrl
        .create({ keyboardClose: true, message: 'Pristupa se sistemu...' })
        .then(loadingEl => {
          loadingEl.present();
          let authObs: Observable<AuthResponseData>;
          authObs = this.authService.login(email, password);
          authObs.subscribe(
              resData => {
                this.isLoading = false;
                loadingEl.dismiss();
                this.router.navigateByUrl('/restaurants');
              },
              errRes => {
                loadingEl.dismiss();
                const code = errRes.error.error.message;
                let message = '';
                if  (code === 'EMAIL_NOT_FOUND') {
                  message = 'E-Mail address could not be found.';
                } else if (code === 'INVALID_PASSWORD') {
                  message = 'This password is not correct.';
                }
                this.prikaziAlert(message);
              }
          );
        });
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    this.autentikacija(email, password);
    form.reset();
  }

  private prikaziAlert(message: string) {
    this.alertCtrl
        .create({
          header: 'Login nije uspeo',
          message: message,
          buttons: ['U redu']
        })
        .then(alertEl => alertEl.present());
  }

  prebaciNaRegister(){
      this.router.navigateByUrl('/register');
  }

}
