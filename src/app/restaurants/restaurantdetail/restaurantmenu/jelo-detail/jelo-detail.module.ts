import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JeloDetailPageRoutingModule } from './jelo-detail-routing.module';

import { JeloDetailPage } from './jelo-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    JeloDetailPageRoutingModule
  ],
  declarations: [JeloDetailPage]
})
export class JeloDetailPageModule {}
