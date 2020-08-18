import {Injectable} from '@angular/core';
import {Restaurant} from "./restaurant.model";
import {BehaviorSubject, of} from "rxjs";
import {AuthService} from "../auth.service";
import {HttpClient} from "@angular/common/http";
import {take, map, tap, delay, switchMap} from 'rxjs/operators';
import {Jelo} from "./restaurantdetail/restaurantmenu/jelo.model";

interface RestaurantData {
    naziv: string,
    slika: string,
    ocena: number,
    vrsta: string,
    predjela: MenuItemData[],
    jela: MenuItemData[],
    dezerti: MenuItemData[]
}

interface MenuItemData {
    naziv: string,
    cena: number,
    slika: string
}

@Injectable({
    providedIn: 'root'
})
export class RestaurantService {
    private _restorani = new BehaviorSubject<Restaurant[]>([]);
    private _jela = new BehaviorSubject<Jelo[]>([]);


    get places() {
        return this._restorani.asObservable();
    }

    get jela() {
        return this._jela.asObservable();
    }

    constructor(private authService: AuthService, private http: HttpClient) {
    }

    fetchPlaces() {
        return this.authService.token.pipe(
            take(1),
            switchMap(token => {
                return this.http.get<{ [key: string]: RestaurantData }>(
                    `https://diplomski-c3ba0.firebaseio.com/restaurants.json?auth=${token}`
                );
            }),
            map(resData => {
                const restorani = [];
                for (const key in resData) {
                    if (resData.hasOwnProperty(key)) {
                        const predjelaData = resData[key].predjela;
                        const predjelaNiz = new Array<Jelo>();
                        for (const predjelo_key in predjelaData) {
                            predjelaNiz.push(new Jelo(predjelo_key, predjelaData[predjelo_key].naziv, predjelaData[predjelo_key].cena, predjelaData[predjelo_key].slika));
                        }

                        const jelaData = resData[key].jela;
                        const jelaNiz = new Array<Jelo>();
                        for (const predjelo_key in jelaData) {
                            jelaNiz.push(new Jelo(predjelo_key, jelaData[predjelo_key].naziv, jelaData[predjelo_key].cena, jelaData[predjelo_key].slika));
                        }

                        const dezertiData = resData[key].dezerti;
                        const dezertiNiz = new Array<Jelo>();
                        for (const predjelo_key in dezertiData) {
                            dezertiNiz.push(new Jelo(predjelo_key, dezertiData[predjelo_key].naziv, dezertiData[predjelo_key].cena, dezertiData[predjelo_key].slika));
                        }
                        const r1 = new Restaurant(
                            key,
                            resData[key].naziv,
                            resData[key].slika,
                            resData[key].ocena,
                            resData[key].vrsta,
                            predjelaNiz,
                            jelaNiz,
                            dezertiNiz
                        );
                        restorani.push(r1);
                    }
                }
                return restorani;
                // return [];
            }),
            tap(places => {
                this._restorani.next(places);
            })
        );
    }


    getRestoran(id: string) {
        return this.authService.token.pipe(
            take(1),
            switchMap(token => {
                return this.http.get<RestaurantData>(
                    `https://diplomski-c3ba0.firebaseio.com/restaurants/${id}/.json?auth=${token}`
                );
            }),
            map(resData => {
                const predjelaData = resData.predjela;
                const predjelaNiz = new Array<Jelo>();
                for (const predjelo_key in predjelaData) {
                    predjelaNiz.push(new Jelo(predjelo_key, predjelaData[predjelo_key].naziv, predjelaData[predjelo_key].cena, predjelaData[predjelo_key].slika));
                }

                const jelaData = resData.jela;
                const jelaNiz = new Array<Jelo>();
                for (const predjelo_key in jelaData) {
                    jelaNiz.push(new Jelo(predjelo_key, jelaData[predjelo_key].naziv, jelaData[predjelo_key].cena, jelaData[predjelo_key].slika));
                }

                const dezertiData = resData.dezerti;
                const dezertiNiz = new Array<Jelo>();
                for (const predjelo_key in dezertiData) {
                    dezertiNiz.push(new Jelo(predjelo_key, dezertiData[predjelo_key].naziv, dezertiData[predjelo_key].cena, dezertiData[predjelo_key].slika));
                }
                return new Restaurant(
                    id,
                    resData.naziv,
                    resData.slika,
                    resData.ocena,
                    resData.vrsta,
                    predjelaNiz,
                    jelaNiz,
                    dezertiNiz
                );
            })
        );
    }
}
