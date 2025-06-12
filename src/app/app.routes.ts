import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'carros',
    loadComponent: () => import('./carros/carros.page').then( m => m.CarrosPage)
  },
  {
    path: 'carro/:carroId',
    loadComponent: () => import('./carros/carro/carro.page').then( m => m.CarroPage)
  },
];
