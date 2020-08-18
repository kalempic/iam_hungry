import {Component, OnDestroy, OnInit} from '@angular/core';
import {Restaurant} from "../restaurants/restaurant.model";
import {Subscription} from "rxjs";
import {AuthService} from "../auth.service";
import {CartService} from "../cart.service";
import {Order} from "../restaurants/restaurantdetail/restaurantmenu/order.model";
import {DatePipe} from "@angular/common";
import {Jelo} from "../restaurants/restaurantdetail/restaurantmenu/jelo.model";

@Component({
    selector: 'app-orders',
    templateUrl: './orders.page.html',
    styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit,OnDestroy {
    ordersLista: Order[];
    private orderSub: Subscription;
    isLoading = false;

    constructor(
        private authService: AuthService,
        private cartService: CartService,
        private datePipe: DatePipe
    ) {
    }

    ngOnInit() {
        this.orderSub = this.cartService.porudzbine.subscribe(restorani => {
            this.ordersLista = restorani;
        });
    }

    ionViewWillEnter() {
        this.isLoading = true;
        this.cartService.fetchOrders().subscribe(() => {
            this.isLoading = false;
        });
    }

    ngOnDestroy() {
        if (this.orderSub) {
            this.orderSub.unsubscribe();
        }
    }
    ispisiZarez(i : number, jela : Jelo[]){
       if  (i === jela.length -1) {
           return ""
       } else return ","
    }
}
