import {Component, OnInit} from '@angular/core';
import {CartService} from "../cart.service";
import {Jelo} from "../restaurants/restaurantdetail/restaurantmenu/jelo.model";
import {Observable} from "rxjs";
import {AuthResponseData} from "../auth.service";
import {AlertController, LoadingController} from "@ionic/angular";
import {Router} from "@angular/router";

@Component({
    selector: 'app-cart',
    templateUrl: './cart.page.html',
    styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
    jela: Jelo[];
    predjela: Jelo[];
    dezerti: Jelo[];
    isLoading = false;

    ukupnaCena : number;

    constructor(private cartService: CartService,
                private loadingCtrl: LoadingController,
                private alertCtrl: AlertController,
                private router: Router,


    ) {
    }

    izbaciJelo(jelo : Jelo, listaJela : Jelo[]){
        for (let i = 0; i < listaJela.length; i++) {
            if (listaJela[i].id === jelo.id) {
                listaJela.splice(i, 1);
                break;
            }
        }
        this.izracunajUkupnuCenuKorpe();
    }

    izracunajUkupnuCenuKorpe() {
        this.ukupnaCena = 0;

        for (let i = 0; i < this.jela.length; i++) {
            this.ukupnaCena += (this.jela[i].cena * this.jela[i].kolicina);
        }
        for (let i = 0; i < this.predjela.length; i++) {
            this.ukupnaCena += (this.predjela[i].cena * this.predjela[i].kolicina);
        }
        for (let i = 0; i < this.dezerti.length; i++) {
            this.ukupnaCena += (this.dezerti[i].cena * this.dezerti[i].kolicina);
        }
    }

    smanjiKolicinu(jelo: Jelo, listaJela: Jelo []) {
        if (jelo.kolicina > 0) {
            jelo.kolicina--;
            if (jelo.kolicina === 0) {
                for (let i = 0; i < listaJela.length; i++) {
                    if (listaJela[i].id === jelo.id) {
                        listaJela.splice(i, 1);
                        break;
                    }
                }
            }
        }
        this.izracunajUkupnuCenuKorpe();
    }

    povecajKolicinu(jelo: Jelo) {
        jelo.kolicina++;

        this.izracunajUkupnuCenuKorpe();
    }

    posaljiPorudzbinu() {
        this.isLoading = true;
        this.loadingCtrl
            .create({ keyboardClose: true, message: 'Pristupa se sistemu...' })
            .then(loadingEl => {
                loadingEl.present();
                let authObs: Observable<{name: string}>;
                authObs = this.cartService.addOrder(this.ukupnaCena);
                authObs.subscribe(
                    resData => {
                        this.isLoading = false;
                        loadingEl.dismiss();
                        this.prikaziAlert('Uspesno ste izvrsili porudzbinu sa sifrom '+resData.name);
                        this.router.navigateByUrl('/orders');

                    },
                    errRes => {
                        loadingEl.dismiss();
                        let message = 'Porudzbina neuspesna neuspešna, pokušajte kasnije.';
                        this.prikaziAlert(message);
                    }
                );
            });
    }

    ngOnInit() {
        this.jela = this.cartService.jela;
        this.predjela = this.cartService.predjela;
        this.dezerti = this.cartService.dezerti;
    }
    ionViewWillEnter(){
        this.izracunajUkupnuCenuKorpe();
    }

    private prikaziAlert(message: string) {
        this.alertCtrl
            .create({
                header: 'Rezultat porudzbine',
                message: message,
                buttons: ['U redu']
            })
            .then(alertEl => alertEl.present());
    }

}
