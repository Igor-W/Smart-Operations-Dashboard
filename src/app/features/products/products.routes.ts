import { Routes } from '@angular/router';

export const productsRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./products-list.component').then((m) => m.ProductsListComponent),
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./product-details.component').then((m) => m.ProductDetailsComponent),
  },
];
