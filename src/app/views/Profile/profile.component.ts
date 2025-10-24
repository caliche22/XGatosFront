import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  standalone: true,
  selector: 'app-profile',
  imports: [CommonModule, MatButtonModule],
  template: `
  <div class="card" *ngIf="user">
    <h2>Bienvenido, {{user.name}} 👋</h2>
    <p><strong>Email:</strong> {{user.email}}</p>
    <button mat-raised-button color="warn" (click)="logout()">Salir</button>
  </div>
  `,
  styles:[`.card{max-width:480px;margin:2rem auto;padding:1rem;border-radius:12px;box-shadow:0 2px 12px rgba(0,0,0,.1);}`]
})
export class ProfileComponent implements OnInit {
  private auth = inject(AuthService);
  user = this.auth.currentUser();

  ngOnInit(): void {
    if (!this.user) {
      (this.auth as any).store?.restore?.();
      this.user = this.auth.currentUser();
    }
  }
  logout(){ this.auth.logout(); location.href = '/'; }
}
