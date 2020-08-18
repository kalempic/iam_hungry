import {Jelo} from "./restaurantdetail/restaurantmenu/jelo.model";

export class Restaurant {
    constructor(
        public id: string,
        public naziv: string,
        public slika: string,
        public ocena: number,
        public vrsta: string,
        public predjela : Jelo[],
        public jela : Jelo[],
        public dezerti : Jelo[]
    ) {
    }

}
