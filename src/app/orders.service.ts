import { Injectable } from '@angular/core';
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private authService : AuthService) { }


}
