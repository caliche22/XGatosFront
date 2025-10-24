import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BreedCardComponent } from './breedcard.component';
import { Breed } from '../interfaces/breed.interface';

describe('BreedCardComponent (Karma/Jasmine)', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BreedCardComponent] // componente standalone
    }).compileComponents();
  });

  function create() {
    const fixture = TestBed.createComponent(BreedCardComponent);
    const comp = fixture.componentInstance;
    return { fixture, comp };
  }

  it('no debe renderizar la tarjeta cuando breed es null', () => {
    const { fixture, comp } = create();
    comp.breed = null;
    fixture.detectChanges();

    // no existe el contenedor .card
    const card = fixture.debugElement.query(By.css('.card'));
    expect(card).toBeNull();
  });

  it('debe renderizar todos los campos cuando breed está completo', () => {
    const { fixture, comp } = create();

    const mock: Breed = {
      id: 'siam',
      name: 'Siamese',
      origin: 'Thailand',
      temperament: 'Active, Agile, Clever, Sociable',
      life_span: '12 - 15',
      description: 'Gato elegante y vocal.'
    } as any;

    comp.breed = mock;
    fixture.detectChanges();

    const el: HTMLElement = fixture.nativeElement;

    // Título
    expect(el.querySelector('h2')?.textContent).toContain('Siamese');

    // Origen
    const pOrigin = el.querySelectorAll('p')[0]?.textContent || '';
    expect(pOrigin).toContain('Origen:');
    expect(pOrigin).toContain('Thailand');

    // Temperamento
    const pTemp = el.querySelectorAll('p')[1]?.textContent || '';
    expect(pTemp).toContain('Temperamento:');
    expect(pTemp).toContain('Active');

    // Vida
    const pLife = el.querySelectorAll('p')[2]?.textContent || '';
    expect(pLife).toContain('Vida:');
    expect(pLife).toContain('12 - 15');
    expect(pLife).toContain('años');

    // Descripción
    const pDesc = el.querySelector('.desc')?.textContent || '';
    expect(pDesc).toContain('Gato elegante y vocal.');
  });

  it('debe mostrar "N/D" en campos faltantes', () => {
    const { fixture, comp } = create();

    const mock: Breed = {
      id: 'abys',
      name: 'Abyssinian',
      // origin: undefined,
      // temperament: undefined,
      // life_span: undefined,
      description: ''
    } as any;

    comp.breed = mock;
    fixture.detectChanges();

    const el: HTMLElement = fixture.nativeElement;

    const pOrigin = el.querySelectorAll('p')[0]?.textContent || '';
    expect(pOrigin).toContain('Origen:');
    expect(pOrigin).toContain('N/D');

    const pTemp = el.querySelectorAll('p')[1]?.textContent || '';
    expect(pTemp).toContain('Temperamento:');
    expect(pTemp).toContain('N/D');

    const pLife = el.querySelectorAll('p')[2]?.textContent || '';
    expect(pLife).toContain('Vida:');
    expect(pLife).toContain('N/D');
  });
});
