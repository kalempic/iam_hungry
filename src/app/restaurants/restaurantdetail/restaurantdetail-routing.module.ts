import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {RestaurantdetailPage} from './restaurantdetail.page';

const routes: Routes = [
    {
        path: '',
        component: RestaurantdetailPage,
        children: [
            { path: '', redirectTo: 'restaurantMenu/predjela', pathMatch: 'full' },
            {
                path: 'restaurantmenu/:id',
                children: [
                    {
                        path: '',
                        loadChildren: () => import('./restaurantmenu/restaurantmenu.module').then(m => m.RestaurantmenuPageModule)
                    }
                ]
            },
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class RestaurantdetailPageRoutingModule {
}
