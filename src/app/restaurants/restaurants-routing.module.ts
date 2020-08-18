import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {RestaurantsPage} from './restaurants.page';

const routes: Routes = [
    {
        path: '',
        component: RestaurantsPage
    },
    {
        path: 'restaurantdetail',
        children: [{
            path: ':restaurantID',
            loadChildren: () => import('./restaurantdetail/restaurantdetail.module').then(m => m.RestaurantdetailPageModule)
        }

        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class RestaurantsPageRoutingModule {
}
