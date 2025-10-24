import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { CarouselComponent } from './carousel.component';
import { CatImage } from '../interfaces/image.interface';

describe('CarouselComponent (Karma/Jasmine)', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarouselComponent, NoopAnimationsModule] // standalone + Material (botones)
    }).compileComponents();
  });

  function create() {
    const fixture = TestBed.createComponent(CarouselComponent);
    const comp = fixture.componentInstance;
    return { fixture, comp };
  }

  const IMAGES: CatImage[] = [
    { id: 'img1', url: 'http://example.com/1.jpg', breeds: [] } as any,
    { id: 'img2', url: 'http://example.com/2.jpg', breeds: [] } as any,
    { id: 'img3', url: 'http://example.com/3.jpg', breeds: [] } as any
  ];

  it('no debe renderizar el contenedor cuando no hay imágenes', () => {
    const { fixture, comp } = create();
    comp.images = [];
    fixture.detectChanges();

    const container = fixture.debugElement.query(By.css('.carousel'));
    expect(container).toBeNull();
  });

  it('debe renderizar la primera imagen inicialmente', () => {
    const { fixture, comp } = create();
    comp.images = IMAGES;
    fixture.detectChanges();

    const img: HTMLImageElement = fixture.nativeElement.querySelector('img');
    expect(img).toBeTruthy();
    expect(img.getAttribute('src')).toBe(IMAGES[0].url);
    expect(img.getAttribute('alt')).toBe(IMAGES[0].id);
    expect(comp.idx).toBe(0);
  });

  it('next() debe avanzar y hacer wrap al final', () => {
    const { fixture, comp } = create();
    comp.images = IMAGES;
    fixture.detectChanges();

    const buttons = fixture.debugElement.queryAll(By.css('button'));
    const nextBtn = buttons[1]; // [prev][next] → next es el segundo

    // 0 -> 1
    nextBtn.triggerEventHandler('click', {});
    fixture.detectChanges();
    let img: HTMLImageElement = fixture.nativeElement.querySelector('img');
    expect(comp.idx).toBe(1);
    expect(img.getAttribute('src')).toBe(IMAGES[1].url);

    // 1 -> 2
    nextBtn.triggerEventHandler('click', {});
    fixture.detectChanges();
    img = fixture.nativeElement.querySelector('img');
    expect(comp.idx).toBe(2);
    expect(img.getAttribute('src')).toBe(IMAGES[2].url);

    // 2 -> 0 (wrap)
    nextBtn.triggerEventHandler('click', {});
    fixture.detectChanges();
    img = fixture.nativeElement.querySelector('img');
    expect(comp.idx).toBe(0);
    expect(img.getAttribute('src')).toBe(IMAGES[0].url);
  });

  it('prev() debe retroceder y hacer wrap al principio', () => {
    const { fixture, comp } = create();
    comp.images = IMAGES;
    comp.idx = 0;
    fixture.detectChanges();

    const prevBtn = fixture.debugElement.queryAll(By.css('button'))[0];

    // 0 -> 2 (wrap)
    prevBtn.triggerEventHandler('click', {});
    fixture.detectChanges();
    let img: HTMLImageElement = fixture.nativeElement.querySelector('img');
    expect(comp.idx).toBe(2);
    expect(img.getAttribute('src')).toBe(IMAGES[2].url);

    // 2 -> 1
    prevBtn.triggerEventHandler('click', {});
    fixture.detectChanges();
    img = fixture.nativeElement.querySelector('img');
    expect(comp.idx).toBe(1);
    expect(img.getAttribute('src')).toBe(IMAGES[1].url);
  });

  it('con una sola imagen, next()/prev() no deben cambiar la imagen', () => {
    const { fixture, comp } = create();
    comp.images = [IMAGES[0]];
    fixture.detectChanges();

    const buttons = fixture.debugElement.queryAll(By.css('button'));
    const prevBtn = buttons[0];
    const nextBtn = buttons[1];

    nextBtn.triggerEventHandler('click', {});
    prevBtn.triggerEventHandler('click', {});
    fixture.detectChanges();

    const img: HTMLImageElement = fixture.nativeElement.querySelector('img');
    expect(comp.idx).toBe(0);
    expect(img.getAttribute('src')).toBe(IMAGES[0].url);
  });
});
