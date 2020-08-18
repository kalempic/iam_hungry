import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RestaurantmenuPageRoutingModule } from './restaurantmenu-routing.module';

import { RestaurantmenuPage } from './restaurantmenu.page';
import {JeloComponent} from './jelo/jelo.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RestaurantmenuPageRoutingModule
  ],
    declarations: [RestaurantmenuPage, JeloComponent]
})
export class RestaurantmenuPageModule {}
