import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'teste3',
    loadChildren: () => import('./teste3/teste3.module').then( m => m.Teste3PageModule)
  },
  {
    path: 'doador',
    loadChildren: () => import('./doador/doador.module').then( m => m.DoadorPageModule)
  },
  {
    path: 'teste3',
    loadChildren: () => import('./teste3/teste3.module').then( m => m.Teste3PageModule)
  },
  {
    path: 'ong',
    loadChildren: () => import('./ong/ong.module').then( m => m.OngPageModule)
  },
  {
    path: 'setor',
    loadChildren: () => import('./setor/setor.module').then( m => m.SetorPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./registro/registro.module').then( m => m.RegistroPageModule)
  },



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
