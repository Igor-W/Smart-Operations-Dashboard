import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-private-layout',
  imports: [RouterOutlet],
  template: `
    <div class="private-layout">
      <header>Header</header>
      <aside>Sidebar</aside>

      <main>
        <router-outlet />
      </main>
    </div>
  `,
})
export class PrivateLayoutComponent {}
