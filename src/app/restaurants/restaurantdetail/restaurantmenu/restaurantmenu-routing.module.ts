import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RestaurantmenuPage } from './restaurantmenu.page';

const routes: Routes = [
  {
    path: '',
    component: RestaurantmenuPage
  },
  {
    path: 'jelo-detail',
    loadChildren: () => import('./jelo-detail/jelo-detail.module').then( m => m.JeloDetailPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RestaurantmenuPageRoutingModule {}
