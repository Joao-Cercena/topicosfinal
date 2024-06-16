import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DoadorPage } from './doador.page';

const routes: Routes = [
  {
    path: '',
    component: DoadorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DoadorPageRoutingModule {}
