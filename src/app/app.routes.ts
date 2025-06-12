import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'carros',
    loadComponent: () => import('./carros/carros.page').then(m => m.CarrosPage)
  },
  {
    path: '',
    redirectTo: 'carros',
    pathMatch: 'full',
  },

  {
    path: 'carro/:carroId',
    loadComponent: () => import('./carros/carro/carro.page').then(m => m.CarroPage)
  },
  {
    path: 'carro-new',
    loadComponent: () => import('./carros/carro-new/carro-new.page').then( m => m.CarroNewPage)
  },
];
