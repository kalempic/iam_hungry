import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RestaurantdetailPageRoutingModule } from './restaurantdetail-routing.module';

import { RestaurantdetailPage } from './restaurantdetail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RestaurantdetailPageRoutingModule
  ],
  declarations: [RestaurantdetailPage]
})
export class RestaurantdetailPageModule {}
