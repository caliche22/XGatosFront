import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, RouterLink, MatButtonModule, MatInputModule, MatFormFieldModule],
  template: `
  <form [formGroup]="form" (ngSubmit)="submit()" class="auth">
    <h2>Login</h2>
    <mat-form-field appearance="outline">
      <mat-label>Email</mat-label>
      <input matInput formControlName="email" type="email"/>
    </mat-form-field>

    <mat-form-field appearance="outline">
      <mat-label>Password</mat-label>
      <input matInput formControlName="password" type="password"/>
    </mat-form-field>

    <button mat-raised-button color="primary" [disabled]="form.invalid">Entrar</button>
    <p class="hint"><a routerLink="/register">Crear cuenta</a></p>
    <p class="error" *ngIf="error">{{error}}</p>
  </form>
  `,
  styles:[`.auth{max-width:360px;margin:2rem auto;display:flex;flex-direction:column;gap:.75rem;} .error{color:#c00}`]
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);
  error = '';

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  submit() {
    if (this.form.invalid) return;
    const { email, password } = this.form.value as any;
    this.auth.login(email, password).subscribe({
      next: () => this.router.navigateByUrl('/profile'),
      error: (err) => this.error = err?.error?.error || 'Error al iniciar sesión'
    });
  }
}
