import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DoadorPageRoutingModule } from './doador-routing.module';

import { DoadorPage } from './doador.page';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DoadorPageRoutingModule,
    HttpClientModule
  ],
  declarations: [DoadorPage]
})
export class DoadorPageModule {}