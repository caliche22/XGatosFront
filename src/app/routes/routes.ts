import { Routes } from '@angular/router';
import { authGuard } from '../guards/auth.guard';
import { guestGuard } from '../guards/guest.guard';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', canActivate: [guestGuard], loadComponent: () => import('../views/Login/login.component').then(m => m.LoginComponent) },
  { path: 'register', canActivate: [guestGuard], loadComponent: () => import('../views/Register/register.component').then(m => m.RegisterComponent) },
  { path: 'home', canActivate: [authGuard], loadComponent: () => import('../views/Home/home.component').then(m => m.HomeComponent) },
  { path: 'profile', canActivate: [authGuard], loadComponent: () => import('../views/Profile/profile.component').then(m => m.ProfileComponent) },
  { path: '**', redirectTo: 'login' }
];
