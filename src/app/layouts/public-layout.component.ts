// src/app/layouts/public-layout.component.ts
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-public-layout',
  imports: [RouterOutlet],
  template: `
    <main class="public-layout">
      <router-outlet />
    </main>
  `,
  styles: [
    `
      .public-layout {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        background-color: #f5f5f5;
      }
    `,
  ],
})
export class PublicLayoutComponent {}
