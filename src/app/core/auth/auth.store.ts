import { computed, Injectable, signal } from '@angular/core';
export interface User {
  id: number;
  email: string;
  role: 'admin' | 'user';
}
@Injectable({
  providedIn: 'root',
})
export class AuthStore {
  private readonly _user = signal<User | null>(null);
  readonly user = this._user.asReadonly();
  readonly isAuthenticated = computed(() => !!this._user());
  readonly isAdmin = computed(() => this._user()?.role === 'admin');

  login(user: User) {
    this._user.set(user);
  }

  logout() {
    this._user.set(null);
  }
}
