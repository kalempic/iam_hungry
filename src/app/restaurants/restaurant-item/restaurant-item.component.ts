import {Component, Input, OnInit} from '@angular/core';
import {Restaurant} from "../restaurant.model";

@Component({
  selector: 'app-restaurant-item',
  templateUrl: './restaurant-item.component.html',
  styleUrls: ['./restaurant-item.component.scss'],
})
export class RestaurantItemComponent implements OnInit {
  @Input() restoran : Restaurant;
  constructor() { }

  ngOnInit() {}

}
