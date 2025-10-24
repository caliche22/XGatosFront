import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { AuthService } from './services/auth.service';

describe('AppComponent', () => {
  it('debe crearse', async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, NoopAnimationsModule],
      providers: [
        provideRouter([]),
        { provide: AuthService, useValue: { isLoggedIn: () => false, logout: () => {} } },
      ],
    }).compileComponents();

    const fixture = TestBed.createComponent(AppComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('muestra Login/Registro cuando NO hay sesión', async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, NoopAnimationsModule],
      providers: [
        provideRouter([]),
        { provide: AuthService, useValue: { isLoggedIn: () => false, logout: () => {} } },
      ],
    }).compileComponents();

    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement;

    expect(el.querySelector('mat-toolbar span')?.textContent).toContain('Cat App');
    expect(el.textContent).toContain('Login');
    expect(el.textContent).toContain('Registro');
    expect(el.textContent).not.toContain('Home');
    expect(el.textContent).not.toContain('Perfil');
    expect(el.textContent).not.toContain('Salir');
  });

  it('muestra Home/Perfil/Salir cuando SÍ hay sesión', async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, NoopAnimationsModule],
      providers: [
        provideRouter([]),
        { provide: AuthService, useValue: { isLoggedIn: () => true, logout: () => {} } },
      ],
    }).compileComponents();

    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement;

    expect(el.querySelector('mat-toolbar span')?.textContent).toContain('Cat App');
    expect(el.textContent).toContain('Home');
    expect(el.textContent).toContain('Perfil');
    expect(el.textContent).toContain('Salir');
    expect(el.textContent).not.toContain('Login');
    expect(el.textContent).not.toContain('Registro');
  });
});
