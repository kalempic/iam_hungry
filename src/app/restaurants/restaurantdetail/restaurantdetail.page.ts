import {Component, OnInit} from '@angular/core';
import {
    ActionSheetController,
    AlertController,
    LoadingController,
    ModalController,
    NavController
} from "@ionic/angular";
import {ActivatedRoute, Router} from "@angular/router";
import {RestaurantService} from "../restaurant.service";
import {AuthService} from "../../auth.service";
import {Restaurant} from "../restaurant.model";
import { switchMap, take } from 'rxjs/operators';
import {MenuServiceService} from "./restaurantmenu/menu-service.service";
import {CartService} from "../../cart.service";


@Component({
    selector: 'app-restaurantdetail',
    templateUrl: './restaurantdetail.page.html',
    styleUrls: ['./restaurantdetail.page.scss'],
})
export class RestaurantdetailPage implements OnInit {
    isLoading = false;
    restoran: Restaurant;

    constructor(
        private navCtrl: NavController,
        private route: ActivatedRoute,
        private restaurantService: RestaurantService,
        private loadingCtrl: LoadingController,
        private authService: AuthService,
        private alertCtrl: AlertController,
        private router: Router,
        private menuServiceService: MenuServiceService,
        private cartService: CartService

    ) {
    }

    ngOnInit() {
        this.cartService.jela = [];
        this.cartService.predjela = [];
        this.cartService.dezerti = [];

        this.route.paramMap.subscribe(paramMap => {
            if (!paramMap.has('restaurantID')) {
                this.navCtrl.navigateBack('/restaurants');
                return;
            }
            this.isLoading = true;
            let fetchedUserId: string;
            this.authService.userId
                .pipe(
                    take(1),
                    switchMap(userId => {
                        if (!userId) {
                            throw new Error('Found no user!');
                        }
                        fetchedUserId = userId;
                        return this.restaurantService.getRestoran(paramMap.get('restaurantID'));
                    })
                )
                .subscribe(
                    restoran => {
                        this.restoran = restoran;
                        this.menuServiceService.dezerti = [...restoran.dezerti];
                        this.menuServiceService.glavnaJela = [...restoran.jela];
                        this.menuServiceService.predjela = [...restoran.predjela];
                        this.isLoading = false;
                    },
                    error => {
                        this.alertCtrl
                            .create({
                                header: 'Doslo je do greske!',
                                message: 'Restoran nije mogao biti ucitan.',
                                buttons: [
                                    {
                                        text: 'U redu',
                                        handler: () => {
                                            this.router.navigate(['/restaurants']);
                                        }
                                    }
                                ]
                            })
                            .then(alertEl => alertEl.present());
                    }
                );
        });
    }

    ionViewWillLeave(){
        this.cartService.restoran = this.restoran;
        for(let i = 0; i<this.menuServiceService.glavnaJela.length;i++){
            if(this.menuServiceService.glavnaJela[i].kolicina != 0){
                this.cartService.jela.push(this.menuServiceService.glavnaJela[i]);
            }
        }
        for(let i = 0; i<this.menuServiceService.predjela.length;i++){
            if(this.menuServiceService.predjela[i].kolicina != 0){
                this.cartService.predjela.push(this.menuServiceService.predjela[i]);
            }
        }
        for(let i = 0; i<this.menuServiceService.dezerti.length;i++){
            if(this.menuServiceService.dezerti[i].kolicina != 0){
                this.cartService.dezerti.push(this.menuServiceService.dezerti[i]);
            }
        }

    }

}
