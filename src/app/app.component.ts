import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet, RouterLink } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink , MatToolbarModule, MatButtonModule],
  template: `
  <mat-toolbar color="primary" class="toolbar">
    <span>Cat App</span>
    <span class="spacer"></span>

    <ng-container *ngIf="!auth.isLoggedIn(); else logged">
      <button mat-button (click)="go('/login')">Login</button>
      <button mat-button (click)="go('/register')">Registro</button>
    </ng-container>

    <ng-template #logged>
      <button mat-button (click)="go('/home')">Home</button>
      <button mat-button (click)="go('/profile')">Perfil</button>
      <button mat-button (click)="logout()">Salir</button>
    </ng-template>
  </mat-toolbar>

  <router-outlet></router-outlet>
  `,
  styles:[`.toolbar{position:sticky;top:0;z-index:100}.spacer{flex:1 1 auto}`]
})
export class AppComponent {
  auth = inject(AuthService);
  private router = inject(Router);

  go(path: string){ this.router.navigateByUrl(path); }
  logout(){ this.auth.logout(); this.router.navigateByUrl('/login'); }
}
