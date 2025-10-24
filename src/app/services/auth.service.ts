import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../enviroments/enviroment.dev';
import { Observable, tap } from 'rxjs';
import { User } from '../interfaces/user.interface';
import { AuthStore } from '../state/auth.store';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private base = environment.apiBaseUrl;
  constructor(private http: HttpClient, private store: AuthStore) {}
  register(name: string, email: string, password: string): Observable<User> {
    const params = new HttpParams().set('name', name).set('email', email).set('password', password);
    return this.http.get<User>(`${this.base}/Register`, { params }).pipe(tap(u => this.store.setUser(u)));
  }
  login(email: string, password: string): Observable<User> {
    const params = new HttpParams().set('email', email).set('password', password);
    return this.http.get<User>(`${this.base}/login`, { params }).pipe(tap(u => this.store.setUser(u)));
  }
  logout() { this.store.clear(); }
  currentUser(): User | null { return this.store.user(); }
  isLoggedIn(): boolean { return !!this.store.user(); }
}
