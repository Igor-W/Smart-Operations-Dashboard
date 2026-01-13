import { Routes } from '@angular/router';
import { PublicLayoutComponent } from './layouts/public-layout.component';
import { LoginComponent } from './features/login/login.component';
import { PrivateLayoutComponent } from './layouts/private-layout.component';
import { authGuard } from './core/auth/auth.guard';

export const routes: Routes = [
  // 🔓 Public
  {
    path: '',
    component: PublicLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent },
      {
        path: 'register',
        loadComponent: () =>
          import('./features/register/register.component').then((m) => m.RegisterComponent),
      },
    ],
  },

  // 🔐 Private
  {
    path: '',
    component: PrivateLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/dashboard/dashboard.component').then((m) => m.DashboardComponent),
      },

      {
        path: 'settings',
        loadComponent: () =>
          import('./features/settings/settings.component').then((m) => m.SettingsComponent),
      },

      {
        path: 'products',
        loadChildren: () =>
          import('./features/products/products.routes').then((m) => m.productsRoutes),
      },
    ],
  },

  { path: '**', redirectTo: 'login' },
];
