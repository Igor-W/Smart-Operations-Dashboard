import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-public-layout',
  imports: [RouterOutlet],
  standalone: true,
  template: `<main class="public-layout">
    <h3>Public Layout</h3>
    <router-outlet />
  </main> `,
})
export class PublicLayoutComponent {}
