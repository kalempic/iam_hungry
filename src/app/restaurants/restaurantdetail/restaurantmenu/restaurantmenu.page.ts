import {Component, OnInit} from '@angular/core';
import {RestaurantService} from "../../restaurant.service";
import {Jelo} from "./jelo.model";
import {ActivatedRoute, Router} from "@angular/router";
import {switchMap, take} from "rxjs/operators";
import {AuthService} from "../../../auth.service";
import {AlertController} from "@ionic/angular";
import {MenuServiceService} from "./menu-service.service";
import {CartService} from "../../../cart.service";

@Component({
    selector: 'app-restaurantmenu',
    templateUrl: './restaurantmenu.page.html',
    styleUrls: ['./restaurantmenu.page.scss'],
})
export class RestaurantmenuPage implements OnInit {
    isLoading = false;
    jela: Jelo[];

    constructor(
        private router: Router,
        private menuServiceService: MenuServiceService,
        private route: ActivatedRoute
    ) {
    }

    ionViewWillEnter() {
    }

    ngOnInit() {
        // // console.log(this.activatedRoute.parent.snapshot.parent.paramMap.get('restaurantID'));
        //  let urlValue = this.router.url;
        //  let route = urlValue.split('/');
        //  let restaurantID = route[route.length -2];
        //  console.log(restaurantID);
        const tip = this.route.snapshot.params.id;
        if(tip === 'jela'){
            this.jela = this.menuServiceService.glavnaJela;
        }
        if(tip === 'predjela'){
            this.jela = this.menuServiceService.predjela;
        }
        if(tip === 'dezerti'){
            this.jela = this.menuServiceService.dezerti;
        }

    }
    idiNaPlacanje(){
        this.router.navigate(['/cart']);
    }

}
