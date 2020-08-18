import {Component, OnDestroy, OnInit} from '@angular/core';
import {Restaurant} from "./restaurant.model";
import {AuthService} from "../auth.service";
import {RestaurantService} from "./restaurant.service";
import {Subscription} from "rxjs";

@Component({
    selector: 'app-restaurants',
    templateUrl: './restaurants.page.html',
    styleUrls: ['./restaurants.page.scss'],
})
export class RestaurantsPage implements OnInit,OnDestroy {
    restoraniLista: Restaurant[];
    private restoraniSub: Subscription;
    isLoading = false;

    constructor(
        private authService: AuthService,
        private restaurantService: RestaurantService
    ) {
    }

    ngOnInit() {
        this.restoraniSub = this.restaurantService.places.subscribe(restorani => {
            this.restoraniLista = restorani;
        });
    }

    ionViewWillEnter() {
        this.isLoading = true;
        this.restaurantService.fetchPlaces().subscribe(() => {
            this.isLoading = false;
        });
    }

    ngOnDestroy() {
        if (this.restoraniSub) {
            this.restoraniSub.unsubscribe();
        }
    }

}
