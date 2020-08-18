import {Jelo} from "./jelo.model";
import {Restaurant} from "../../restaurant.model";

export class Order {
    constructor(
        public id: string,
        public vreme: Date,
        public userID : string,
        public predjela: Jelo[],
        public glavnaJela: Jelo[],
        public dezerti: Jelo[],
        public restoranID: string,
        public restoranNaziv: string,
        public ukupnaCena : number,
    ) {
    }

}
