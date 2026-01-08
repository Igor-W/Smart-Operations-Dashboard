import { effect, inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
export interface User {
  id: number;
  email: string;
  role: 'admin' | 'user';
}
@Injectable({
  providedIn: 'root',
})
export class AuthStore {
  private readonly lsKey = 'sod_auth_user';
  private readonly router = inject(Router);

  private readonly _user = signal<User | null>(null);
  readonly user = this._user;

  constructor() {
    const raw = localStorage.getItem(this.lsKey);
    if (raw) {
      try {
        this._user.set(JSON.parse(raw));
      } catch {
        localStorage.removeItem(this.lsKey);
      }
    }

    effect(() => {
      const u = this._user();
      if (u) {
        localStorage.setItem(this.lsKey, JSON.stringify(u));
        this.router.navigateByUrl('/dashboard');
      } else {
        localStorage.removeItem(this.lsKey);
        this.router.navigateByUrl('/login');
      }
    });
  }
  login(user: User) {
    this._user.set(user);
  }

  logout() {
    this._user.set(null);
  }
}
