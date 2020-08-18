import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {AuthResponseData, AuthService} from "../auth.service";
import {AlertController, LoadingController} from "@ionic/angular";
import {NgForm} from "@angular/forms";

@Component({
    selector: 'app-register',
    templateUrl: './register.page.html',
    styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
    isLoading = false;

    constructor(private alertCtrl: AlertController,
                private authService: AuthService,
                private router: Router,
                private loadingCtrl: LoadingController,) {
    }

    ngOnInit() {
    }

    prebaciNaLogin() {
        this.router.navigateByUrl('/login');
    }

    registracija(email: string, password: string) {
        this.isLoading = true;
        this.loadingCtrl
            .create({keyboardClose: true, message: 'Pristupa se sistemu...'})
            .then(loadingEl => {
                loadingEl.present();
                let authObs: Observable<AuthResponseData>;
                authObs = this.authService.signup(email, password);
                authObs.subscribe(
                    resData => {
                        this.isLoading = false;
                        loadingEl.dismiss();
                        this.prikaziAlert('Uspesno ste se registrovali');
                        this.router.navigateByUrl('/login');

                    },
                    errRes => {
                        loadingEl.dismiss();
                        const code = errRes.error.error.message;
                        let message = 'Registracija neuspešna, pokušajte kasnije.';
                        if (code === 'EMAIL_EXISTS') {
                            message = 'Ovaj mejl već postoji!';
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
        form.reset();
        this.registracija(email, password);
    }

    checkPassword(form: NgForm) {
        const password = form.value.password;
        const password1 = form.value.confirmPassword;

        if (password === password1) {
            return true
        } else {
            return false
        }
    }

    private prikaziAlert(message: string) {
        this.alertCtrl
            .create({
                header: 'Registracija',
                message: message,
                buttons: ['U redu']
            })
            .then(alertEl => alertEl.present());
    }
}
