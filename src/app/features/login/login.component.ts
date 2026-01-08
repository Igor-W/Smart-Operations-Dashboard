import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthStore } from '../../core/auth/auth.store';
import { Router } from '@angular/router';
import { Field, form, maxLength, minLength, required } from '@angular/forms/signals';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { users } from '../../data/users';

export interface LoginForm {
  email: string;
  password: string;
}

@Component({
  standalone: true,
  imports: [
    CommonModule,
    Field,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  template: `
    <mat-card class="login-card">
      <form (submit)="login(); $event.preventDefault()" class="login-form">
        <h2>Login</h2>

        <mat-form-field appearance="fill">
          <mat-label>Email</mat-label>
          <input matInput [field]="loginForm.email" type="email" />
          @for(error of loginForm.email().errors(); track error){
          <mat-error>{{ error.message }}</mat-error>
          }
        </mat-form-field>

        <mat-form-field appearance="fill">
          <mat-label>Password</mat-label>
          <input matInput [field]="loginForm.password" type="password" />
          @for(error of loginForm.password().errors(); track error){
          <mat-error>{{ error.message }}</mat-error>
          }
        </mat-form-field>

        <button mat-flat-button color="primary" type="submit" class="login-button">Login</button>
      </form>
      @if(showLoginErrors()) {
      <div class="error-message">
        <mat-error>Incorrect email or password</mat-error>
      </div>
      }
    </mat-card>
  `,
  styles: [
    `
      :host {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100vh;
        background: var(--background, #f5f7fb);
      }
      .login-card {
        width: 380px;
        padding: 1.25rem;
        box-sizing: border-box;
      }
      .login-form {
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }
      .login-button {
        align-self: flex-end;
      }
    `,
  ],
})
export class LoginComponent {
  private readonly authStore = inject(AuthStore);
  private readonly router = inject(Router);

  showLoginErrors = signal(false);
  protected readonly loginData = signal<LoginForm>({
    email: 'admin@test.com',
    password: 'password123',
  });
  protected readonly loginForm = form(this.loginData, (path) => {
    required(path.email, { message: 'Email is required' });
    required(path.password, { message: 'Password is required' });
    minLength(path.password, 8, { message: 'Password must be at least 8 characters' });
    minLength(path.email, 5, { message: 'Email must be at least 5 characters' });
    maxLength(path.email, 15, { message: 'Email cannot exceed 15 characters' });
    maxLength(path.password, 20, { message: 'Password cannot exceed 20 characters' });
  });
  login() {
    const user = users.find(
      (u) =>
        u.email === this.loginForm.email().value() &&
        u.password === this.loginForm.password().value()
    );
    if (!user) {
      this.showLoginErrors.set(true);
      return;
    }
    this.authStore.login({
      id: user.id,
      email: user.email,
      role: user.role,
    });
    this.router.navigate(['/dashboard']);
  }
}
