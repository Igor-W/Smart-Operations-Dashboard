// src/app/layouts/private-layout.component.ts
import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthStore } from '../core/auth/auth.store';

interface MenuItem {
  label: string;
  route: string;
}

@Component({
  standalone: true,
  selector: 'app-private-layout',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <div class="private-layout">
      <header>
        <h1>Smart Operations Dashboard</h1>
        <button (click)="logout()">Logout</button>
      </header>

      <aside>
        <nav>
          @for (item of menu(); track item.route) {
          <a [routerLink]="item.route" routerLinkActive="active">
            {{ item.label }}
          </a>
          }
        </nav>
      </aside>

      <main>
        <router-outlet />
      </main>
    </div>
  `,
  styles: [
    `
      .private-layout {
        display: grid;
        grid-template-rows: 60px 1fr;
        grid-template-columns: 200px 1fr;
        grid-template-areas:
          'header header'
          'aside main';
        height: 100vh;
      }
      header {
        grid-area: header;
        background: #3f51b5;
        color: white;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 16px;
      }
      aside {
        grid-area: aside;
        background: #f0f0f0;
        padding: 16px;
      }
      main {
        grid-area: main;
        padding: 16px;
        overflow-y: auto;
      }
      a.active {
        font-weight: bold;
      }
    `,
  ],
})
export class PrivateLayoutComponent {
  private readonly authStore = inject(AuthStore);
  private readonly router = inject(Router);

  // Menu items can depend on role
  menu = signal<MenuItem[]>([
    { label: 'Dashboard', route: '/dashboard' },
    { label: 'Settings', route: '/settings' },
    { label: 'Products', route: '/products' },
  ]);

  logout() {
    this.authStore.logout();
    this.router.navigate(['/login']);
  }
}
