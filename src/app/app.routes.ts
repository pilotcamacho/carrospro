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
  {
    path: 'servicios',
    loadComponent: () => import('./servicios/servicios.page').then( m => m.ServiciosPage)
  },
  {
    path: 'servicio/:carroId',
    loadComponent: () => import('./servicios/servicio/servicio.page').then( m => m.ServicioPage)
  },
  {
    path: 'documents',
    loadComponent: () => import('./documents/documents.page').then( m => m.DocumentsPage)
  },
  {
    path: 'document/:carroId',
    loadComponent: () => import('./documents/document/document.page').then( m => m.DocumentPage)
  },
  {
    path: 'to-dos',
    loadComponent: () => import('./to-dos/to-dos.page').then( m => m.ToDosPage)
  },
  {
    path: 'to-do/:carroId',
    loadComponent: () => import('./to-dos/to-do/to-do.page').then( m => m.ToDoPage)
  },
];
