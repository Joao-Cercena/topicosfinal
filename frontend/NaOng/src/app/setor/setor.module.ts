import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SetorPageRoutingModule } from './setor-routing.module';

import { SetorPage } from './setor.page';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SetorPageRoutingModule,
    HttpClientModule
  ],
  declarations: [SetorPage]
})
export class SetorPageModule {}
