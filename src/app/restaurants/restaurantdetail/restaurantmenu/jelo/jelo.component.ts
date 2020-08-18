import {Component, Input, OnInit} from '@angular/core';
import {Restaurant} from "../../../restaurant.model";
import {Jelo} from "../jelo.model";
import {CartService} from "../../../../cart.service";

@Component({
    selector: 'app-jelo',
    templateUrl: './jelo.component.html',
    styleUrls: ['./jelo.component.scss'],
})
export class JeloComponent implements OnInit {
    @Input() jelo: Jelo

    constructor() {
    }

    ngOnInit() {
    }

    dodajJelo() {
        this.jelo.kolicina++;
        // let nadjenoJelo = false;
        // for (let i = 0; i < this.cart.jela.length; ++i) {
        //     if(this.cart.jela[i].id === this.jelo.id){
        //         nadjenoJelo = true;
        //         this.cart.jela[i].kolicina++;
        //         break;
        //     }
        // }
        // if(!nadjenoJelo){
        //     this.cart.jela.push(this.jelo);
        // }

        }

    oduzmiJelo() {
        if(this.jelo.kolicina >0){
            this.jelo.kolicina --;
        }
        // if (this.jelo.kolicina > 0) {
        //     this.jelo.kolicina--;
        //     for (let i = 0; i < this.cart.jela.length; ++i) {
        //         if (this.cart.jela[i].id === this.jelo.id) {
        //             if (this.cart.jela[i].kolicina <= 0) {
        //                 this.cart.jela.splice(i, 1);
        //
        //             } else {
        //                 this.cart.jela[i].kolicina++;
        //             }
        //         }
        //     }
        // }
    }

}
