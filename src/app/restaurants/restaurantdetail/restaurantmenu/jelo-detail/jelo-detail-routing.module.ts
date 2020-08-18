import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JeloDetailPage } from './jelo-detail.page';

const routes: Routes = [
  {
    path: '',
    component: JeloDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JeloDetailPageRoutingModule {}
