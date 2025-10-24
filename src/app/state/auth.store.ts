import { Injectable, signal } from '@angular/core';
import { User } from '../interfaces/user.interface';

@Injectable({ providedIn: 'root' })
export class AuthStore {
  private _user = signal<User | null>(null);
  user = this._user.asReadonly();
  setUser(u: User) { this._user.set(u); localStorage.setItem('user', JSON.stringify(u)); }
  restore() { const raw = localStorage.getItem('user'); if (raw) this._user.set(JSON.parse(raw)); }
  clear() { this._user.set(null); localStorage.removeItem('user'); }
}
