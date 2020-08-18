import {Injectable} from '@angular/core';
import {Jelo} from "./jelo.model";


@Injectable({
    providedIn: 'root'
})
export class MenuServiceService {
    public glavnaJela: Jelo[];
    public dezerti: Jelo[];
    public predjela: Jelo[];


    constructor() {
    }


}
