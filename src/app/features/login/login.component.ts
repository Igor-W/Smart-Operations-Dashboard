import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthStore } from '../../core/auth/auth.store';

@Component({
  standalone: true,
  imports: [CommonModule],
  template: `
    <h2>Login</h2>
    <button (click)="login()">Fake Login</button>
  `,
})
export class LoginComponent {
  private readonly authStore = inject(AuthStore);

  login() {
    this.authStore.login({
      id: 1,
      email: 'admin@test.com',
      role: 'admin',
    });
  }
}
