// src/app/layouts/public-layout.component.ts
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet, RouterLinkActive } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-public-layout',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <div class="public-layout">
      <header class="public-header">
        <h1>Smart Operations Dashboard</h1>
        <nav>
          <a routerLink="/login" routerLinkActive="active">Login</a>
          <a routerLink="/register" routerLinkActive="active">Register</a>
        </nav>
      </header>

      <main class="public-main">
        <router-outlet></router-outlet>
      </main>

      <footer class="public-footer">© 2026 Your Company</footer>
    </div>
  `,
  styles: [
    `
      .public-layout {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
      }

      .public-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 12px 24px;
        background: #fff;
      }

      .public-main {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #f5f7fb;
        padding: 24px;
      }

      .public-footer {
        text-align: center;
        padding: 12px;
        color: #666;
        font-size: 0.9rem;
      }

      nav a {
        margin-left: 12px;
        text-decoration: none;
        color: var(--primary, #3f51b5);
      }

      nav a.active {
        font-weight: 600;
      }
    `,
  ],
})
export class PublicLayoutComponent {}
