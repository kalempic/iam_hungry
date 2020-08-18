import {Injectable} from '@angular/core';
import {Jelo} from "./restaurants/restaurantdetail/restaurantmenu/jelo.model";
import {Restaurant} from "./restaurants/restaurant.model";
import {AuthService} from "./auth.service";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject} from "rxjs";
import {Order} from "./restaurants/restaurantdetail/restaurantmenu/order.model";
import {map, switchMap, take, tap} from "rxjs/operators";

interface OrderItemData {
    naziv: string,
    cena: number,
    slika: string,
    kolicina: number,
}

interface OrderData {
    id: string,
    vreme: Date,
    userID: string,
    glavnaJela: OrderItemData[],
    dezerti: OrderItemData[],
    predjela: OrderItemData[],
    restoranID: string,
    restoranNaziv: string,
    ukupnaCena : number
}

@Injectable({
    providedIn: 'root'
})
export class CartService {
    public restoran: Restaurant;
    public jela: Jelo[] = [];
    public predjela: Jelo[] = [];
    public dezerti: Jelo[] = [];
    private _porudzbine = new BehaviorSubject<Order[]>([]);

    get porudzbine() {
        return this._porudzbine.asObservable();
    }

    constructor(private authService: AuthService, private http: HttpClient) {
    }


    addOrder(ukupnaCena : number) {
        let fetchedUserId: string;
        let novaPorudzbina: Order;

        return this.authService.userId.pipe(
            take(1),
            switchMap(userId => {
                if (!userId) {
                    throw new Error('No user id found!');
                }
                fetchedUserId = userId;
                return this.authService.token;
            }),
            take(1),
            switchMap(token => {
                novaPorudzbina = new Order(
                    Math.random().toString(),
                    new Date(),
                    fetchedUserId,
                    this.jela,
                    this.dezerti,
                    this.predjela,
                    this.restoran.id,
                    this.restoran.naziv,
                    ukupnaCena
                );
                return this.http.post<{ name: string }>(
                    `https://diplomski-c3ba0.firebaseio.com/orders.json?auth=${token}`,
                    {...novaPorudzbina, id: null}
                );
            }),
        );
    }

    fetchOrders() {
        let fetchedUserId: string;
        return this.authService.userId.pipe(
            take(1),
            switchMap(userId => {
                if (!userId) {
                    throw new Error('User not found!');
                }
                fetchedUserId = userId;
                return this.authService.token;
            }),
            take(1),
            switchMap(token => {
                return this.http.get<{ [key: string]: OrderData }>(
                    `https://diplomski-c3ba0.firebaseio.com/orders.json?orderBy="userID"&equalTo="${fetchedUserId}"&auth=${token}`
                );
            }),
            map(resData => {
                const narudzbine = [];
                for (const key in resData) {
                    if (resData.hasOwnProperty(key)) {
                        const predjelaData = resData[key].predjela;
                        const predjelaNiz = new Array<Jelo>();
                        for (const predjelo_key in predjelaData) {
                            predjelaNiz.push(new Jelo(predjelo_key, predjelaData[predjelo_key].naziv, predjelaData[predjelo_key].cena, predjelaData[predjelo_key].slika, predjelaData[predjelo_key].kolicina));
                        }

                        const jelaData = resData[key].glavnaJela;
                        const jelaNiz = new Array<Jelo>();
                        for (const predjelo_key in jelaData) {
                            jelaNiz.push(new Jelo(predjelo_key, jelaData[predjelo_key].naziv, jelaData[predjelo_key].cena, jelaData[predjelo_key].slika, jelaData[predjelo_key].kolicina));
                        }

                        const dezertiData = resData[key].dezerti;
                        const dezertiNiz = new Array<Jelo>();
                        for (const predjelo_key in dezertiData) {
                            dezertiNiz.push(new Jelo(predjelo_key, dezertiData[predjelo_key].naziv, dezertiData[predjelo_key].cena, dezertiData[predjelo_key].slika, dezertiData[predjelo_key].kolicina));
                        }
                        const r1 = new Order(
                            key,
                            resData[key].vreme,
                            resData[key].userID,
                            predjelaNiz,
                            jelaNiz,
                            dezertiNiz,
                            resData[key].restoranID,
                            resData[key].restoranNaziv,
                            resData[key].ukupnaCena,
                        );
                        narudzbine.push(r1);
                    }
                }
                return narudzbine;
                // return [];
            }),
            tap(places => {
                this._porudzbine.next(places);
            })
        );
    }
}
